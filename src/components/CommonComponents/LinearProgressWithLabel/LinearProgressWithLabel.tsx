import React from "react";
import { LinearProgress, LinearProgressProps } from "@material-ui/core";
import "./LinearProgressWithLabel.scss"
const LinearProgressWithLabel = (props: LinearProgressProps & { value: number, start: number, end: number }) => {
    return (
        <div className="linear-progress-container">
            <div className="linear-progress">
                <LinearProgress variant="determinate" {...props} />
                <div className="range-progress-bar">
                    <span>{props.start} </span>
                    <span>{props.end}</span>
                </div>
            </div>
            <div className="precent-text">{`${Math.round(
                props.value,
            )}%`}
            </div>
        </div>)
}
export default LinearProgressWithLabel