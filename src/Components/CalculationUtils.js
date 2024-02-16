export const getPipeInsideDiameter = (valuePipeSize, valueWeight, pipeData) => {
    const pipeOutsideDiameter = Number(valuePipeSize); // OD – pipe outside diameter [in]
    const wallThickness = pipeData.wallThickness[valuePipeSize][valueWeight]; //Wall thickness [in]
    const PipeInsideDiameter = pipeOutsideDiameter - 2 * wallThickness; //ID - drill pipe inside diameter [in]
    return PipeInsideDiameter;
};

export const getMomentOfInertia = (valuePipeSize, valueWeight, pipeData) => { // I – moment of inertia 
    const pipeOutsideDiameter = Number(valuePipeSize);
    const pipeInsideDiameter = getPipeInsideDiameter(valuePipeSize, valueWeight, pipeData);
    const momentOfInertia = Math.PI * ((Math.pow(pipeOutsideDiameter, 4) - Math.pow(pipeInsideDiameter,4))/32);

    return momentOfInertia;
};

export const getCrossSectionArea = (valuePipeSize, valueWeight, pipeData) => { // A – cross section area [in2]
    const radiusPipeOutside = (Number(valuePipeSize))/2;
    const pipeInsideDiameter = getPipeInsideDiameter(valuePipeSize, valueWeight, pipeData);
    const radiusPipeInside = pipeInsideDiameter/2;
    const crossSectionArea = (Math.PI * ((Math.pow(radiusPipeOutside, 2) - Math.pow(radiusPipeInside,2))));

    return crossSectionArea;
};

export const getTorque = (valueTorqueUnit) => {
    const torqueConversionFactor = valueTorqueUnit === 'kftlb' ? 1 : 1.3558179483; // 1 kftlb = 1.3558179483 kNm
    const torque = Array.from({ length: 150 }, (item, i) => i * 1000 * torqueConversionFactor); // Tq – Torque
    return torque;
}
   
export const getTensionMax = (valuePipeSize, valueWeight, pipeData, valueTensionUnit, valueTorqueUnit) => {
    const yieldStrengthData = pipeData.sizes[valuePipeSize].yieldStrength; // Y – Yield Strength [psi]
    const pipeOutsideDiameter = Number(valuePipeSize); // OD
    const momentOfInertia = getMomentOfInertia(valuePipeSize, valueWeight, pipeData); // I
    const torque = getTorque(valueTorqueUnit);
    const crossSectionArea = getCrossSectionArea (valuePipeSize, valueWeight, pipeData);
    
    let tensions = [];
    let lastTension = 0;
    for (let i = 0; i < torque.length; i++) {
        const currentTorque = torque[i];
        // square of expression(Tq*OD)/0.09167*I
        const term1 = (currentTorque * pipeOutsideDiameter) / (0.09167 * momentOfInertia);
        const term2 = Math.pow(term1, 2);
        
        // Calculating the square root of Y^2 - ((Tq*OD)/0.09167*I)^2
        const rootTerm = Math.sqrt(Math.pow(yieldStrengthData, 2) - term2);

        //Calculation Tmax = A * square root of rootTerm
        const tensionMax = crossSectionArea * rootTerm;

        if (isNaN(tensionMax)) {
            tensions.push(0);
            break;
        }

        const tensionConversionFactor = valueTensionUnit === 'klb' ? 1 : 0.000453592 // for mT
        lastTension = tensionMax * tensionConversionFactor;
        tensions.push(lastTension);
    }

    return tensions;
};



const getTensionWithSafetyFactorApplied = (tensions, safetyFactor) => {// Tsf - tension with safety factor applied
    const toNumberSafetyFactor = Number(safetyFactor);
    return tensions.map(tension => (1 - (toNumberSafetyFactor / 100)) * tension);
};

export const calculate = (valuePipeSize, valueWeight, pipeData, valueSelectedSafetyFactor, valueTorqueUnit, valueTensionUnit) => {
    const tensions = getTensionMax(valuePipeSize, valueWeight, pipeData, valueTensionUnit, valueTorqueUnit);
    const torque = getTorque(valueTorqueUnit).slice(0, tensions.length);
    const tensionsWithSafetyFactorApplied = getTensionWithSafetyFactorApplied(tensions, valueSelectedSafetyFactor);

    console.log('Maximum allowable torque:', torque);
    console.log('Maximum allowable tensions:', tensions);
    console.log('tension with safety factor applied:', tensionsWithSafetyFactorApplied);

    return {
        torqueOutputValue: torque,
        tensionOutputValue: tensions,
        tensionWithSafetyFactorOutputValue: tensionsWithSafetyFactorApplied,
    };
};
