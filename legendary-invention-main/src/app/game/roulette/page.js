'use client'
import React, { useState, useReducer, useMemo, useEffect } from 'react'
import {
	Box,
	Typography,
	IconButton,
	CircularProgress
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ThemeProvider, styled, createTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import currency from 'currency.js'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import TextFieldCurrency from '@/components/TextFieldCurrency'
import Button from '@/components/Button'
import { rouletteTutorial, rouletteOdds } from './tutorials'
import { rouletteABI, rouletteContractAddress, linkABI, linkContractAddress } from './contractDetails'
import { publicMumbaiClient, walletMumbaiClient } from './ViemClient'
import { getContract, parseEther } from 'viem'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { muiStyles } from './styles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; 


const TooltipWide = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 800,
	},
});

function BetBox({
	betValue = 0,
	betType = '',
	...props
}) {
	return (
		<Tooltip title={<Typography>{betType}: {betValue}</Typography>}>
			<Box sx={{
				borderRadius: '50%', width: '30px', height: '30px',
				position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
				boxShadow: '3px 3px 5px black', display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: (theme) => theme.palette.accent.main, zIndex: 5
			}}  {...props}>
				<Typography sx={{ fontSize: '10px', color: (theme) => theme.palette.dark.bg }}>{betValue}</Typography>
			</Box>
		</Tooltip>
	)
}

function GridInside({
	insideNumber = -1, // must define this
	topEdge = false,
	red = false,
	straightup = 0,
	splitleft = 0,
	splitbottom = 0,
	corner = 0,
	placeBet,
	...props
}) {
	return (
		<ParentSize {...props}>
			{({ width }) =>
				<Box sx={{
					display: 'flex', alignItems: 'stretch',
					width: width, height: topEdge ? width + 10 : width,
					...(red && { backgroundColor: (theme) => theme.palette.game.red })
				}}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '10px' }} id='left-edge'>
						{topEdge && <Box sx={{ height: '10px', backgroundColor: (theme) => theme.palette.dark.card }}></Box>}
						<Box sx={{ position: 'relative', flex: 1, backgroundColor: (theme) => theme.palette.dark.card, cursor: 'pointer' }}
							id='left-split-bet' onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 2)}>
							{splitleft > 0 && <BetBox betValue={splitleft} betType={'Split'} onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 2)} />}
						</Box>
						<Box sx={{ position: 'relative', height: '10px', backgroundColor: (theme) => theme.palette.dark.card, cursor: 'pointer' }}
							id='left-corner-bet' onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 4)}>
							{corner > 0 && <BetBox betValue={corner} betType={'Corner'} onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 4)} />}
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						{topEdge && <Box sx={{ height: '10px', backgroundColor: (theme) => theme.palette.dark.card }}></Box>}
						<Box sx={{ position: 'relative', flex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
							id='straight-bet' onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 1)}>
							<Typography variant='h5'>{insideNumber}</Typography>
							{straightup > 0 && <BetBox betValue={straightup} betType={'Straight up'} onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 1)} />}
						</Box>
						<Box sx={{ position: 'relative', flex: 1, backgroundColor: (theme) => theme.palette.dark.card, maxHeight: '10px', minHeight: '10px', cursor: 'pointer' }}
							id='bottom-split-bet' onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 3)}>
							{splitbottom > 0 && <BetBox betValue={splitbottom} betType={'Split'} onClick={(e) => placeBet(e, 'inside', (insideNumber - 1) * 4 + 3)} />}
						</Box>
					</Box>
				</Box>
			}
		</ParentSize>
	)
}

function GridZero({
	inside,
	placeBet,
	...props
}) {
	return (
		<ParentSize {...props}>
			{({ width, height }) =>
				<Box sx={{
					position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
					width: width, height: height, cursor: 'pointer',
					clipPath: 'polygon(100% 0%, 100% 100%, 40% 100%, 0% 50%, 40% 0%)',
					backgroundColor: (theme) => theme.palette.game.green
				}}
					onClick={(e) => placeBet(e, 'inside', 0)}>
					<Typography variant='h5'>0</Typography>
					{inside[0] > 0 &&
						<BetBox betValue={inside[0]} betType={'Straight up'}
							onClick={(e) => placeBet(e, 'inside', 0)} />}
				</Box>
			}
		</ParentSize>
	)
}

function GridColumnBet({
	topCard = false,
	bottomCard = false,
	index,
	columns,
	bet,
	placeBet,
	...props
}) {
	return (
		<ParentSize style={{ height: '100%' }} {...props}>
			{({ width, height }) =>
				<Box sx={{
					position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
					width: width, height: height, cursor: 'pointer',
					backgroundColor: (theme) => theme.palette.dark.button,
					borderTop: (theme) => `${topCard ? 10 : 5}px solid ${theme.palette.dark.card}`,
					borderBottom: (theme) => `${bottomCard ? 10 : 5}px solid ${theme.palette.dark.card}`,
					borderRight: (theme) => '10px solid ' + theme.palette.dark.card,
					borderLeft: (theme) => '10px solid ' + theme.palette.dark.card
				}}
					onClick={(e) => placeBet(e, 'columns', index)}>
					<Typography variant='h5'>2 To 1</Typography>
					{columns[index] > 0 &&
						<BetBox betValue={columns[index]} betType={`2 To 1 (row ${index + 1})`}
							onClick={(e) => placeBet(e, 'columns', index)} />}
				</Box>
			}
		</ParentSize>
	)
}

function GridOutsideBet({
	rightCard = false,
	...props
}) {
	return (
		<Box sx={{
			position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, cursor: 'pointer',
			backgroundColor: (theme) => theme.palette.dark.button,
			borderBottom: (theme) => '10px solid ' + theme.palette.dark.card,
			borderLeft: (theme) => '10px solid ' + theme.palette.dark.card
		}} {...props}>
			{props.children}
		</Box>
	)
}

const firstThird = [
	{ val: 3, red: true }, { val: 6 }, { val: 9, red: true }, { val: 12 },
	{ val: 2 }, { val: 5, red: true }, { val: 8 }, { val: 11 },
	{ val: 1, red: true }, { val: 4 }, { val: 7, red: true }, { val: 10 }]
const secondThird = [
	{ val: 15 }, { val: 18, red: true }, { val: 21, red: true }, { val: 24 },
	{ val: 14, red: true }, { val: 17 }, { val: 20 }, { val: 23, red: true },
	{ val: 13 }, { val: 16, red: true }, { val: 19, red: true }, { val: 22 }]
const thirdThird = [
	{ val: 27, red: true }, { val: 30, red: true }, { val: 33 }, { val: 36, red: true },
	{ val: 26 }, { val: 29 }, { val: 32, red: true }, { val: 35 },
	{ val: 25, red: true }, { val: 28 }, { val: 31 }, { val: 34, red: true }]

const arrayReducer = (state, action) => {
	switch (action.type) {
		case 'reset':
			return new Array(state.length).fill(0)
		case 'update':
			let updatedArr = [...state]
			updatedArr[action.ind] = action.val
			return updatedArr
		default:
			return state
	}
}

const eventReducer = (state, action) => {
	switch (action.type) {
		case 'reset':
			return []
		case 'update':
			return action.payload
		default:
			return state
	}
}

export default function GameRoulette() {
	const [events, dispatchEvents] = useReducer(eventReducer, [])

	const [bet, setBet] = useState(0)
	// all the inside bets
	const [inside, dispatchInside] = useReducer(arrayReducer, new Array(145).fill(0))
	// all the outside bets
	const [red, setRed] = useState(0)
	const [black, setBlack] = useState(0)
	const [odd, setOdd] = useState(0)
	const [even, setEven] = useState(0)
	const [over, setOver] = useState(0)
	const [under, setUnder] = useState(0)
	const [dozens, dispatchDozens] = useReducer(arrayReducer, [0, 0, 0])
	const [columns, dispatchColumns] = useReducer(arrayReducer, [0, 0, 0])

	const [correctNetwork, setCorrectNetwork] = useState(false)

	const [submitDisabled, setSubmitDisabled] = useState(false)

	const [winnings, setWinnings] = useState(-1)
	const [rollResult, setRollResult] = useState(-1)

	const primaryWallet = ''// useDynamicContext();

	const [balance, setBalance] = useState(-1)

	const winningsListener = useMemo(() => {
		return publicMumbaiClient.watchContractEvent({
			address: rouletteContractAddress,
			abi: rouletteABI,
			functionName: 'RandomNumberFulfilled',
			onLogs: (logs) => {
				setWinnings(parseInt(logs[0].args.totalWinnings) * 1E-18);
				setRollResult(parseInt(logs[0].args.randomResult))
			}
		})
	}, [])

	// updating the bet size
	const handleBetChange = (e) => {
		setBet(parseFloat(e.target.value));
	}

	const getBetArray = () => {
		let outputArr = new Array(157).fill(0) // total amount

		// zero bet
		outputArr[0] = inside[0]
		// iterate through the inside bets, fill in split, street, corner, six
		Array.from(Array(36)).forEach((val, i) => {
			let ind = i + 1 // since skipping 0
			// straight up
			outputArr[ind] = inside[(ind - 1) * 4 + 1]

			// left split
			outputArr[ind + 36] = inside[(ind - 1) * 4 + 2] // horizontal split


			// bottom split
			if (ind % 3 === 1) { // true street bet
				outputArr[Math.floor(ind / 3) + 99] = inside[(ind - 1) * 4 + 3]
			}
			else {
				outputArr[(Math.floor((ind - 1) / 3) * 2 + ((ind - 1) % 3)) + 72] = inside[(ind - 1) * 4 + 3] // vertical split
			}

			// corners
			if (ind === 1) { // corner 0, 1, 2, 3
				outputArr[111] = inside[ind * 4]
			}
			else if (ind === 2) { // street bet 0, 1, 2
				outputArr[97] = inside[ind * 4]
			}
			else if (ind === 3) { // street bet 0, 2, 3
				outputArr[98] = inside[ind * 4]
			}
			else if (ind % 3 === 1) { //six bets
				outputArr[((ind - 4) / 3) + 134] = inside[ind * 4]
			}
			else { // true corner bet
				outputArr[ind + 107] = inside[ind * 4]
			}
		})

		// all the outside bets
		outputArr[145] = columns[2]
		outputArr[146] = columns[1]
		outputArr[147] = columns[0]
		outputArr[148] = dozens[0]
		outputArr[149] = dozens[1]
		outputArr[150] = dozens[2]
		outputArr[151] = red
		outputArr[152] = black
		outputArr[153] = over
		outputArr[154] = under
		outputArr[155] = even
		outputArr[156] = odd
		return outputArr
	}

	const lockBet = async () => {
		setSubmitDisabled(true)
		let betSpread = getBetArray();
		if (primaryWallet?.address) {
			let addr = primaryWallet.address

			const amount = parseEther('' + total + 1)
			console.log(betSpread)
			const approvalRequest = await publicMumbaiClient.simulateContract({
				address: linkContractAddress,
				abi: linkABI,
				functionName: 'approve',
				args: [rouletteContractAddress, amount],
				account: addr
			})
			await walletMumbaiClient.writeContract(approvalRequest.request)
			// place bets
			await walletMumbaiClient.writeContract({
				address: rouletteContractAddress,
				abi: rouletteABI,
				functionName: 'placeBets',
				args: [betSpread.map((val) => parseEther('' + val))],
				account: addr
			})
		}

		return
	}

	// pop from events
	const revertEvent = (e) => {
		e.preventDefault();
		if (events.length > 0) {
			let singleEvent = events[events.length - 1];
			placeBet(e, singleEvent?.type, singleEvent?.ind, singleEvent?.oldVal, true)
			let newArr = events.slice(0, -1)
			dispatchEvents({ type: 'update', payload: newArr })
		}
	}

	// insert into events
	const insertEvent = (type, oldVal, newVal, ind = 0) => {
		let newArr = [...events]
		newArr.push({ type: type, oldVal: oldVal, newVal: newVal, ind: ind })
		dispatchEvents({ type: 'update', payload: newArr })
	}

	// interact with clicks
	const placeBet = (e, type, ind = 0, newVal = bet, revert = false) => {
		e.preventDefault();
		e.stopPropagation();
		if (isNaN(newVal)) {
			return
		}
		if (type === 'red') {
			if (red !== newVal) {
				if (!revert) {
					insertEvent(type, red, newVal)
				}
				setRed(newVal)
			}
		}
		else if (type === 'black') {
			if (black !== newVal) {
				if (!revert) {
					insertEvent(type, black, newVal)
				}
				setBlack(newVal)
			}
		}
		else if (type === 'odd') {
			if (odd !== newVal) {
				if (!revert) {
					insertEvent(type, odd, newVal)
				}
				setOdd(newVal)
			}
		}
		else if (type === 'even') {
			if (even !== newVal) {
				if (!revert) {
					insertEvent(type, even, newVal)
				}
				setEven(newVal)
			}
		}
		else if (type === 'over') {
			if (over !== newVal) {
				if (!revert) {
					insertEvent(type, over, newVal)
				}
				setOver(newVal)
			}
		}
		else if (type === 'under') {
			if (under !== newVal) {
				if (!revert) {
					insertEvent(type, under, newVal)
				}
				setUnder(newVal)
			}
		}
		else if (type === 'dozens') {
			if (dozens[ind] !== newVal) {
				if (!revert) {
					insertEvent(type, dozens[ind], newVal, ind)
				}
				dispatchDozens({ type: 'update', ind: ind, val: newVal })
			}
		}
		else if (type === 'columns') {
			if (columns[ind] !== newVal) {
				if (!revert) {
					insertEvent(type, columns[ind], newVal, ind)
				}
				dispatchColumns({ type: 'update', ind: ind, val: newVal })
			}
		}
		else if (type === 'inside') {
			if (inside[ind] !== newVal) {
				if (!revert) {
					insertEvent(type, inside[ind], newVal, ind)
				}
				dispatchInside({ type: 'update', ind: ind, val: newVal })
			}
		}
	}

	// reset all the bets
	const reset = (e) => {
		e.preventDefault();
		setRed(0)
		setBlack(0)
		setOdd(0)
		setEven(0)
		setOver(0)
		setUnder(0)
		dispatchDozens({ type: 'reset' })
		dispatchColumns({ type: 'reset' })
		dispatchInside({ type: 'reset' })
		dispatchEvents({ type: 'reset' })
		setRollResult(-1)
		setWinnings(-1)
	}

	const handleWithdrawWinnings = async (e) => {
		let addr = primaryWallet.address
		reset(e)
		const withdrawSimulation = await publicMumbaiClient.simulateContract({
			address: rouletteContractAddress,
			abi: rouletteABI,
			functionName: 'withdrawWinnings',
			account: addr
		})
		await walletMumbaiClient.writeContract(withdrawSimulation.request)
	}

	const total = useMemo(() => {
		let val = red + black + odd + even + over + under;
		val += dozens.reduce((acc, currVal) => {
			return acc + currVal
		}, 0);
		val += columns.reduce((acc, currVal) => {
			return acc + currVal
		}, 0);
		val += inside.reduce((acc, currVal) => {
			return acc + currVal
		}, 0);
		return val
	}, [red, black, odd, even, over, under, dozens, columns, inside])

	useEffect(() => {
		const checkNetwork = async () => {
			if (typeof window === "undefined") return
			if (window.ethereum) {
				const currentChaidId = await window.ethereum.request({ method: 'eth_chainId' });
				if (currentChaidId === '0x13881') {
					setCorrectNetwork(true)
				}
			}

			// load balance
			await publicMumbaiClient.getBalance({ address: primaryWallet?.address }).then((res) => {
				setBalance(parseInt(res) * 1E-18)
			}).catch((err) => {
				setBalance(0.)
			})
		}
		checkNetwork()
	}, [])

	const switchNetwork = async () => {
		if (typeof window !== "undefined") {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x13881' }]
			})
			window.location.reload();
		}
	}

	const theme = createTheme(muiStyles['dark'])

	return (
		<ThemeProvider theme={theme}>
			<div className='font-sans bg-[#070005]'>
				<Navbar />
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
					<Grid container sx={{ mt: 20, mx: 10 }} columns={14}>
						<Grid md={1}><GridZero inside={inside} placeBet={placeBet} /></Grid>
						<Grid md={4} container columns={12}>
							{firstThird.map((val, ind) =>
								<Grid md={3} key={`first-third-${val.val}`}>
									<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4} placeBet={placeBet}
										straightup={inside[(val.val - 1) * 4 + 1]}
										splitleft={inside[(val.val - 1) * 4 + 2]}
										splitbottom={inside[(val.val - 1) * 4 + 3]}
										corner={inside[(val.val - 1) * 4 + 4]} />
								</Grid>
							)}
						</Grid>
						<Grid md={4} container columns={12}>
							{secondThird.map((val, ind) =>
								<Grid md={3} key={`second-third-${val.val}`}>
									<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4} placeBet={placeBet}
										straightup={inside[(val.val - 1) * 4 + 1]}
										splitleft={inside[(val.val - 1) * 4 + 2]}
										splitbottom={inside[(val.val - 1) * 4 + 3]}
										corner={inside[(val.val - 1) * 4 + 4]} />
								</Grid>
							)}
						</Grid>
						<Grid md={4} container columns={12}>
							{thirdThird.map((val, ind) =>
								<Grid md={3} key={`third-third-${val.val}`}>
									<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4} placeBet={placeBet}
										straightup={inside[(val.val - 1) * 4 + 1]}
										splitleft={inside[(val.val - 1) * 4 + 2]}
										splitbottom={inside[(val.val - 1) * 4 + 3]}
										corner={inside[(val.val - 1) * 4 + 4]} />
								</Grid>
							)}
						</Grid>
						<Grid md={1} sx={{ display: 'flex', alignItems: 'stretch' }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
								<GridColumnBet topCard={true} columns={columns} index={0} bet={bet} placeBet={placeBet} />
								<GridColumnBet columns={columns} index={1} bet={bet} placeBet={placeBet} />
								<GridColumnBet bottomCard={true} columns={columns} index={2} bet={bet} placeBet={placeBet} />
							</Box>
						</Grid>

						<Grid md={1} />
						<Grid md={4}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'dozens', 0)}>
								<Typography variant='h5'>1st 12</Typography>
								{dozens[0] > 0 && <BetBox betValue={dozens[0]} betType='1st 12' onClick={(e) => placeBet(e, 'dozens', 0)} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={4}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'dozens', 1)}>
								<Typography variant='h5'>2nd 12</Typography>
								{dozens[1] > 0 && <BetBox betValue={dozens[1]} betType='2nd 12' onClick={(e) => placeBet(e, 'dozens', 1)} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={4}>
							<GridOutsideBet rightCard={true} onClick={(e) => placeBet(e, 'dozens', 2)}>
								<Typography variant='h5'>3rd 12</Typography>
								{dozens[2] > 0 && <BetBox betValue={dozens[2]} betType='3rd 12' onClick={(e) => placeBet(e, 'dozens', 2)} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={1} sx={{ borderLeft: (theme) => `10px solid ${theme.palette.dark.card}` }} />

						<Grid md={1} />
						<Grid md={2}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'under')}>
								<Typography variant='h5'>1-18</Typography>
								{under > 0 && <BetBox betValue={under} betType='Under (1-18)' onClick={(e) => placeBet(e, 'under')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={2}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'even')}>
								<Typography variant='h5'>Even</Typography>
								{even > 0 && <BetBox betValue={even} betType='Even' onClick={(e) => placeBet(e, 'even')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={2}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'red')}>
								<Box sx={{ width: '32px', height: '32px', backgroundColor: (theme) => theme.palette.game.red }} />
								{red > 0 && <BetBox betValue={red} betType='Red' onClick={(e) => placeBet(e, 'red')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={2}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'black')}>
								<Box sx={{ width: '32px', height: '32px', backgroundColor: (theme) => theme.palette.dark.bg }} />
								{black > 0 && <BetBox betValue={black} betType='Black' onClick={(e) => placeBet(e, 'black')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={2}>
							<GridOutsideBet onClick={(e) => placeBet(e, 'odd')}>
								<Typography variant='h5'>Odd</Typography>
								{odd > 0 && <BetBox betValue={odd} betType='Odd' onClick={(e) => placeBet(e, 'odd')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={2}>
							<GridOutsideBet rightCard={true} onClick={(e) => placeBet(e, 'over')}>
								<Typography variant='h5'>19-36</Typography>
								{over > 0 && <BetBox betValue={over} betType='Over (19-36)' onClick={(e) => placeBet(e, 'over')} />}
							</GridOutsideBet>
						</Grid>
						<Grid md={1} sx={{ borderLeft: (theme) => `10px solid ${theme.palette.dark.card}` }} />
					</Grid>

					<Box sx={{ mt: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mb: 5 }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', mr: 10, mt: 2 }}>
							<Typography variant='h3' color="text.accent">Roulette</Typography>
							<TooltipWide title={<Typography>{rouletteTutorial}</Typography>}>
								<Box sx={{ display: 'flex', alignItems: 'center' }} color='text.secondary'>
									<Typography variant='h6'>Tutorial</Typography>
									<InfoIcon sx={{ ml: 1 }} />
								</Box>
							</TooltipWide>
							<TooltipWide
								title={<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									{rouletteOdds.map((v, ind) => <Typography key={`tutorial-odds-${ind}`}>{v}</Typography>)}
								</Box>}>
								<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }} color='text.secondary'>
									<Typography variant='h6'>Odds</Typography>
									<InfoIcon sx={{ ml: 1 }} />
								</Box>
							</TooltipWide>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<TextFieldCurrency label='Bet Amount' variant='standard' value={bet} handleChange={handleBetChange} />
							{balance < 0 ? <CircularProgress size='1.2rem' /> :
								<Typography color='text.secondary'>Total Balance {currency(balance, { pattern: '#', precision: 4 }).format()}</Typography>}
							<Typography color='text.secondary'>Current Bet Total {currency(total, { pattern: '#' }).format()}</Typography>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 3, mt: 1 }}>
							<Tooltip title={<Typography>Undo last bet</Typography>}>
								<span><IconButton disabled={(events.length === 0) || submitDisabled} onClick={revertEvent}><UndoIcon /></IconButton></span>
							</Tooltip>
							<Tooltip title={<Typography>Clear bet</Typography>}>
								<IconButton sx={{ mt: 1 }} disabled={submitDisabled} onClick={reset}><ClearIcon /></IconButton>
							</Tooltip>
						</Box>
						<Box sx={{ ml: 3, mt: 1 }}>
							{rollResult >= 0 ?
								<Box>
									{winnings > 0 ? <Button onClick={handleWithdrawWinnings}>Collect</Button> : <Button onClick={reset}>Go Again</Button>}
									<Box sx={{ mt: 1 }}>
										<Typography>Rolled: {rollResult}</Typography>
										<Typography>Returns (incl. winnings): {winnings}</Typography>
									</Box>
								</Box>
								:
								(correctNetwork ?
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<Button disabled={total === 0} loading={submitDisabled} onClick={() => lockBet()}>Submit Bet</Button>
										{submitDisabled && rollResult < 0 && <Typography color='text.secondary'>Die being rolled, please wait...</Typography>}
									</Box> :
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<Button onClick={() => switchNetwork()}>Switch Network</Button>
									</Box>
								)
							}
						</Box>
					</Box>
				</Box>
				<Footer />
			</div>
		</ThemeProvider>
	)
}