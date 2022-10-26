import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";

type Props = {
	subject: string;
	onUpdateCallback(th: number, tw: number): void;
};

const Pointer301 = ({ subject, onUpdateCallback }: Props) => {
	const [theoryRes, setTheoryRes] = useState(0);
	const [termWorkRes, setTermWorkRes] = useState(0);

	const [ise, setIse] = useState(0);
	const [ia, setIa] = useState(0);
	const [ese, setEse] = useState(0);
	const [tw, setTw] = useState(0);

	useEffect(() => {
		// * 1 is just for readability purpose
		onUpdateCallback(theoryRes * 3, termWorkRes * 1);
	}, [theoryRes, termWorkRes]);

	useEffect(() => {
		setTheoryRes(calculatePointer(ise + ia + ese / 2, 100));
	}, [ise, ia, ese]);

	useEffect(() => {
		setTermWorkRes(calculatePointer(tw, 25));
	}, [tw]);

  const handleTheoryMarksChange=(num:number)=>{

    let temp = 0;
		if (num === 10) temp = 80;
		else if (num === 9) temp = 70;
		else if (num === 8) temp = 60;
		else if (num === 7) temp = 55;
		else if (num === 6) temp = 50;
		else if (num === 5) temp = 45;
		else if (num === 4) temp = 40;
		const newValue = (temp - (ise + ia)) * 2;
    setEse(newValue)
  }

  const handleTWMarksChange=(num:number)=>{
    let temp=0;
    if (num === 10) temp = 20;
		else if (num === 9) temp = 17.5;
		else if (num === 8) temp = 15;
		else if (num === 7) temp = 13.75;
		else if (num === 6) temp = 12.5;
		else if (num === 5) temp = 11.25;
		else if (num === 4) temp = 10;
    setTw(temp)
  }

	return (
		<Box sx={{ mt: 4 }}>
			<Typography sx={{ mb: 3 }} variant="h4">
				{subject}
			</Typography>
			<TextField
				label="ISE"
				value={ise.toString()}
				onChange={(e) => setIse(Number(e.target.value))}
				type="number"
				sx={{ mr: 2, mb: 2 }}
			/>
			<TextField
				label="IA"
				value={ia.toString()}
				onChange={(e) => setIa(Number(e.target.value))}
				type="number"
				sx={{ mr: 2, mb: 2 }}
			/>
			<TextField
				label="ESE"
				value={ese.toString()}
				onChange={(e) => setEse(Number(e.target.value))}
				type="number"
				sx={{ mr: 2, mb: 2 }}
			/>
			<TextField
				label="TW"
				value={tw.toString()}
				onChange={(e) => setTw(Number(e.target.value))}
				type="number"
				sx={{ mr: 2, mb: 2 }}
			/>

			<Box>
				<Typography variant="h5" sx={{ my: 2 }}>
					Theory
				</Typography>
				<Typography>Grade Pointer (G): {theoryRes}</Typography>
				<Slider
					sx={{ width: "80vw" }}
					min={4}
					step={1}
					max={10}
					value={theoryRes}
					onChange={(e, num) => {
            handleTheoryMarksChange(Number(num))
					}}
					defaultValue={9}
				/>
			</Box>
			<Box>
				<Typography variant="h5" sx={{ my: 2 }}>
					Term Work
				</Typography>
				<Typography>Grade Pointer (G): {termWorkRes}</Typography>
				<Slider
					sx={{ width: "80vw" }}
					min={4}
					step={1}
					max={10}
					value={termWorkRes}
					onChange={(e, num) => {
            handleTWMarksChange(Number(num))
					}}
					defaultValue={9}
				/>
			</Box>
		</Box>
	);
};

export default Pointer301;

export interface Pointer301ResponseType {
	tw: number;
	theory: number;
}
