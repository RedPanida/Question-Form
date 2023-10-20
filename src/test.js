import React, { useState, useEffect } from 'react'

function Home() {
	const [value, setValue] = useState(0)

	useEffect(() => {
		console.log(value, 'value')
	}, [])
	

  return (
    // <div>Home</div>
		<button onClick={() => setValue(value + 1)}>click!</button>
  )
}

export default Home