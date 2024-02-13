import React, { useState } from "react";
import './InputUserForm.css';

export default function InputUserForm () {
    const [selectedPipeSize, setSelectedPipeSize] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    // const [selectedSafetyFactor, setSelectedSafetyFactor] = useState('');
    // const [selectedTorqueUnit, setSelectedTorqueUnit] = useState('');
    // const [selectedTensionUnit, setSelectedTensionUnit] = useState('');

    const weightOptions = {
        '4': ['14.0', '15.7', '19.56'],
        '5': ['19.5', '25.6', '34.01'],
        '5.875': ['23.4', '26.3', '28.7', '34.21', '41.05'],
    }

    const handlePipeSizeChange = (e) => {
        const newPipeSize = e.target.value;
        setSelectedPipeSize(newPipeSize);
        setSelectedWeight('');
    };

    return (
        <div className="user-form-container">
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="pipeNominalSize">Pipe Nominal Size</label>
                    <select id="pipeNominalSize" name="pipeNominalSize" onChange={handlePipeSizeChange} value={selectedPipeSize}>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="5.875">5 7/8</option>
                    </select>
                    <span className="input-unit">inch</span>
                </div>
                <div className="form-group">
                    <label htmlFor="nominalWeight">Nominal Weight</label>
                    <select id="nominalWeight" name="nominalWeight" onChange={(e) => setSelectedWeight(e.target.value)} value={selectedWeight}>
                        {weightOptions[selectedPipeSize]?.map((weight, index) => (
                            <option key={index} value={weight}>{weight}</option>
                        ))}
                    </select>
                    <span className="input-unit">lb/ft</span>
                </div>
                <div className="form-group">
                    <label htmlFor="safetyFactor">Safety Factor</label>
                    <select id="safetyFactor" name="safetyFactor">
                        {[...Array(18)].map((_, index) => (
                        <option key={index} value={(index + 1)* 5}>
                            {(index +1)*5}
                        </option>
                        ))}
                    </select>
                    <span className="input-unit">%</span>
                </div>
                <div className="form-group">
                    <label htmlFor="torqueUnit">Torque unit</label>
                    <select id="torqueUnit" name="torqueUnit">
                        <option value="kNm">kNm</option>
                        <option value="kftlb">kftlb</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tensionUnit">Tension unit</label>
                    <select id="tensionUnit" name="tensionUnit">
                        <option value="kNm">mT</option>
                        <option value="kftlb">klb</option>
                    </select>
                </div>
            </div>
            <div className="culculate-btn-container">
                <button className="culculate-btn">Culculate</button>
            </div>
        </div>                
    )
}