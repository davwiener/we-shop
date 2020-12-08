import React from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '../../../assets/icons'
const PlusMinusButttons = (props: any) => {
    return (<div>

        <button
            onClick={() => props.increase()}
            className="btn btn-primary btn-sm mr-2 mb-1">
            <PlusCircleIcon width={"20px"} />
        </button>


        <button
            onClick={() => props.decrease()}
            className="btn btn-danger btn-sm mb-1">
            <MinusCircleIcon width={"20px"} />
        </button>
    </div>
    )
}
export default PlusMinusButttons
