import React, { useState } from "react";
import './InputUserForm.css';
import { culculate } from './CulculationUtils';
import  Chart from './Chart';

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
    const [selectedPipeSize, setSelectedPipeSize] = useState('4');
    const [selectedWeight, setSelectedWeight] = useState('14.0');
    const [selectedSafetyFactor, setSelectedSafetyFactor] = useState('20');
    const [selectedTorqueUnit, setSelectedTorqueUnit] = useState('kftlb');
    const [selectedTensionUnit, setSelectedTensionUnit] = useState('klb');
    const [culculatedResult, setCulculatedResult] = useState(null);
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

    
    const handleClickCulculateBtn = () => {
        const result = culculate(selectedPipeSize, selectedWeight, pipeData, selectedSafetyFactor, selectedTorqueUnit, selectedTensionUnit);
        setCulculatedResult(result);
        setDisabled(true);
    }

    return (
        <div className="user-form-container">
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="pipeNominalSize">Pipe Nominal Size</label>
                    <select id="pipeNominalSize" name="pipeNominalSize" onChange={handlePipeSizeChange} value={selectedPipeSize}>
                        {Object.keys(pipeData.sizes).map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span className="input-unit">inch</span>
                </div>
                <div className="form-group">
                    <label htmlFor="nominalWeight">Nominal Weight</label>
                    <select id="nominalWeight" name="nominalWeight" onChange={handleNominalWeightChange} value={selectedWeight}>
                        {pipeData.weights[selectedPipeSize].map((weight, index) => (
                            <option key={index} value={weight}>{weight}</option>
                        ))}
                    </select>
                    <span className="input-unit">lb/ft</span>
                </div>
                <div className="form-group">
                    <label htmlFor="safetyFactor">Safety Factor</label>
                    <select id="safetyFactor" name="safetyFactor" onChange={handleSafetyFactorChange} value={selectedSafetyFactor}>
                        {[...Array(18)].map((item, index) => (
                        <option key={index} value={(index + 1)* 5}>
                            {(index +1)*5}
                        </option>
                        ))}
                    </select>
                    <span className="input-unit">%</span>
                </div>
                <div className="form-group">
                    <label htmlFor="torqueUnit">Torque unit</label>
                    <select id="torqueUnit" name="torqueUnit" onChange={handleTorqueUnitChange} value={selectedTorqueUnit}>
                        <option value="kNm">kNm</option>
                        <option value="kftlb">kftlb</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tensionUnit">Tension unit</label>
                    <select id="tensionUnit" name="tensionUnit" onChange={handleTensionUnitChange} value={selectedTensionUnit}>
                        <option value="mT">mT</option>
                        <option value="klb">klb</option>
                    </select>
                </div>
            </div>
            <div className="culculate-btn-container" onClick={handleClickCulculateBtn}>
                <button className="culculate-btn" disabled={disabled} >Culculate</button>
            </div>
            <div className="chart-container">
                <Chart 
                    culculatedResult={culculatedResult}
                    selectedPipeSize={selectedPipeSize}
                    selectedWeight={selectedWeight}
                    selectedTorqueUnit={selectedTorqueUnit}
                    selectedTensionUnit={selectedTensionUnit}
                /> 
            </div>
            
        </div>                
    )
}