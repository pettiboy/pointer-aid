import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import sumObject from "../../../../../utils/sumObject";
import Pointer010 from "../../../../shared/Pointer010";
import Pointer011 from "../../../../shared/Pointer011";
import Pointer300 from "../../../../shared/Pointer300";
import Pointer301 from "../../../../shared/Pointer301";
import PointerDisplay from "../../../../shared/PointerDisplay";

type Props = {};

const KjsceItSem3Calculator = (props: Props) => {
	const [sgpi, setSgpi] = useState(0);

	const [cgs, setCgs] = useState<StringNumberObject>({});

	const totalCredits = 22;

	useEffect(() => {
		const avg = sumObject(cgs) / totalCredits;
		const pointer = Math.round((avg + Number.EPSILON) * 100) / 100;
		setSgpi(pointer);
	}, [cgs]);

	const handleInputChange = (name: string, value: number) => {
		setCgs((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	return (
		<Box sx={{ p: 5 }}>
			<Grid container spacing={6}>
				{/* 301 */}
				<Grid item xs={12} md={6} lg={6} xl={4}>
					<Pointer301
						subject="Discrete and Applied Mathematics"
						onUpdateCallback={(th, tw) => {
							handleInputChange("DAMTH", th);
							handleInputChange("DAMTW", tw);
						}}
					/>
				</Grid>

				{/* 300 */}
				<Grid item xs={12} md={6} lg={6} xl={4}>
					<Pointer300
						subject="Data Structures"
						onUpdateCallback={(cg) => {
							handleInputChange("DS", cg);
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={6} xl={4}>
					<Pointer300
						subject="Database Management Systems"
						onUpdateCallback={(cg) => {
							handleInputChange("DMS", cg);
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={6} xl={4}>
					<Pointer300
						subject="Digital Systems"
						onUpdateCallback={(cg) => {
							handleInputChange("DiS", cg);
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={6} xl={4}>
					<Pointer300
						subject="Data Communication and Networking"
						onUpdateCallback={(cg) => {
							handleInputChange("DCN", cg);
						}}
					/>
				</Grid>

				{/* 011 */}
				{/* <Pointer011
          subject="Progamming Laboratory"
          onUpdateCallback={(cg) => {
            handleInputChange("PL", cg);
          }}
        /> */}

				{/* 010 */}
				{/* <Pointer010
          subject="Data Structures Laboratory"
          onUpdateCallback={(cg) => {
            handleInputChange("DSL", cg);
          }}
        />
        <Pointer010
          subject="Database Management Systems Laboratory"
          onUpdateCallback={(cg) => {
            handleInputChange("DMSL", cg);
          }}
        />
        <Pointer010
          subject="Digital Systems Laboratory"
          onUpdateCallback={(cg) => {
            handleInputChange("DiSL", cg);
          }}
        />
        <Pointer010
          subject="Data Communication and Networking Laboratory"
          onUpdateCallback={(cg) => {
            handleInputChange("DCNL", cg);
          }}
        /> */}
			</Grid>

			<Box sx={{ mb: 10 }}></Box>

			<PointerDisplay pointer={sgpi} />
		</Box>
	);
};

export default KjsceItSem3Calculator;
