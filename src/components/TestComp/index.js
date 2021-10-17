import React, { useState, useEffect } from 'react'

function TestComp({props : {open, header}}) {

	console.log(open, header)

	useEffect(() => {
		if(open){
			console.log("now the modal is open")
		}else{
			console.log("now the modal is closed")
		}
	}, [open])

	return (
		<div>
			{
				open ? <p>{header}</p> : null
			}
		</div>
	)
}

export default TestComp
