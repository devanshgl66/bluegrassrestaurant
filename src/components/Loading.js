import React from 'react'

export const Loading=()=>{
    return(
        <div className='container'>
            <div className='row'>
                <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
                <h3>Loading . . .</h3>
            </div>
        </div>
    )
}