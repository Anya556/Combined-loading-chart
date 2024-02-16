import React, { useState } from "react";
import './InputUserForm.css';
import { calculate } from './CalculationUtils';
import  Chart from './Chart';
import CustomSelector from "./CustomSelector";

const pipeData = {
    sizes: {
        '4': { yieldStrength: 135000 }, //Y – Minimum Yield Strength =  Yield Strength [psi]
        '5': { yieldStrength: 135000 },
        '5.875': { yieldStrength: 95000 }
    },
    weights: {
        '4': ['14.0', '15.7', '19.56'],
        '5': ['19.5', '25.6', '34.01'],
        '5.875': ['23.4', '26.3', '28.7', '34.21', '41.05']
    },
    wallThickness: {
        '4': {
            '14.0': 0.33,
            '15.7': 0.380,
            '19.56': 0.500
        },
        '5': {
            '19.5': 0.362,
            '25.6': 0.500,
            '34.01': 0.750
        },
        '5.875': {
            '23.4': 0.361,
            '26.3': 0.415,
            '28.7': 0.500,
            '34.21': 0.625,
            '41.05': 0.750
        }
    }
};

export default function InputUserForm () {

    const getPipeNominalSizeOptions = () => {
        return Object.keys(pipeData.sizes).map((size) => ({value: size}));
    }

    const getWeightOptions = () => {
        return pipeData.weights[selectedPipeSize].map((weight, index) => ({value: weight}));
    };

    const getSafetyFactorOptionValue = (index) => {
        return (index +1)*5;
    };

    const getSafetyFactorOptions = () => {
        return [...Array(18)].map((item, index) => ({value: getSafetyFactorOptionValue(index)}));
    };

    const getUnitsOptions = (units) => {
        return units.map(value => ({ value }));
    }
  
    const [selectedPipeSize, setSelectedPipeSize] = useState('4');
    const [selectedWeight, setSelectedWeight] = useState('14.0');
    const [selectedSafetyFactor, setSelectedSafetyFactor] = useState('20');
    const [selectedTorqueUnit, setSelectedTorqueUnit] = useState('kftlb');
    const [selectedTensionUnit, setSelectedTensionUnit] = useState('klb');
    const [calculatedResult, setCalculatedResult] = useState({});
    const [disabled, setDisabled] = useState(false);

    const handlePipeSizeChange = (e) => {
        const newPipeSize = e.target.value;
        setSelectedPipeSize(newPipeSize);
        setSelectedWeight(pipeData.weights[newPipeSize][0]);
        setDisabled(false);
    };

    const handleNominalWeightChange = (e) => {
        setSelectedWeight(e.target.value);
        setDisabled(false);
    }

    const handleSafetyFactorChange = (e) => {
        setSelectedSafetyFactor(e.target.value);
        setDisabled(false);
    }

    const handleTorqueUnitChange = (e) => {
        setSelectedTorqueUnit(e.target.value);
        setDisabled(false);
    }

    const handleTensionUnitChange = (e) => {
        setSelectedTensionUnit(e.target.value);
        setDisabled(false);
    }
    
    const handleClickCalculateBtn = () => {
        const result = calculate(selectedPipeSize, selectedWeight, pipeData, selectedSafetyFactor, selectedTorqueUnit, selectedTensionUnit);
        const chartData = {
            data: result,
            selectedPipeSize,
            selectedWeight,
            selectedSafetyFactor,
            selectedTorqueUnit,
            selectedTensionUnit
        }
        setCalculatedResult(chartData);
        setDisabled(true);
    }

    return (
        <div className="user-form-container">
            <div className="form-container">
                <div className="form-group">
                    <CustomSelector 
                        selectorIdName="pipeNominalSize" 
                        labelName="Pipe Nominal Size" 
                        options={getPipeNominalSizeOptions()}
                        unit="inch" 
                        onChange={handlePipeSizeChange} 
                        value={selectedPipeSize} 
                    />
                </div>
                <div className="form-group">
                    <CustomSelector
                        selectorIdName = "nominalWeight" 
                        labelName = "Nominal Weight"
                        options = {getWeightOptions()}
                        unit = "lb/ft" 
                        onChange={handleNominalWeightChange}
                        value={selectedWeight}/>
                </div>
                <div className="form-group">
                    <CustomSelector selectorIdName="safetyFactor" labelName="Safety Factor" 
                    options={getSafetyFactorOptions()} 
                    unit="%" 
                    onChange={handleSafetyFactorChange} 
                    value={selectedSafetyFactor} 
                    />
                </div>
                <div className="form-group">
                    <CustomSelector 
                        selectorIdName="torqueUnit" 
                        labelName="Torque unit" 
                        options={getUnitsOptions(['kNm', 'kftlb'])} 
                        onChange={handleTorqueUnitChange} 
                        value={selectedTorqueUnit} 
                    />
                </div>
                <div className="form-group">
                    <CustomSelector
                        selectorIdName="tensionUnit"
                        labelName="Tension unit"
                        options={getUnitsOptions(['mT', 'klb'])}
                        onChange={handleTensionUnitChange} 
                        value={selectedTensionUnit}
                    />
                </div>
            </div>
            <div className="calculate-btn-container" onClick={handleClickCalculateBtn}>
                <button className="calculate-btn" disabled={disabled}>Calculate</button>
            </div>
            <div className="chart-container">
                <Chart 
                    calculatedResult={calculatedResult}
                    needRefresh={disabled}
                /> 
            </div>
        </div>                
    )
}