  import React from 'react'
  import service from '../Firebase/conf'
  import authService from '../Firebase/auth'
  
  

 

  function Home() {

    const find = async()=>{
      await authService.getCurrentUser()
      .then(async(user) => {
        await service.getUserDocs({uid: user.uid})
        .then((data) => console.log(data.data().email))
        .catch((e)=> console.log(e))
      })
      .catch((e)=> {console.log(e.code);})
    }

  return (
  <>
 <div className=" w-full">
  {/*main */}
  <div className=" flex flex-wrap justify-center">

    {/* card goes here */}
    <div className=" bg-white flex flex-col my-4 rounded-lg border-[5px] shadow-sm mx-2 justify-center shadow-black "
    onClick={find}
    >
      
      <img className=' w-[200px] mb-3' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQxJREFUSEvtl08OwUAUh78uuAEOYImEC4g/cQBL1+ACTsAVLCwsrewEeyt7YukU6CRTqaYz2jEMSSdp0nbee9+837xMXz0cDc8RFxU4D3SBBiDuTccV2AOraIA4cBVYA0VTWozfAhiE38eBD0DNIjQIVQZOwUMUXAIucnICjN5cQAvYyBhtYKsCN4GdnOyEnEz5icFKQ588TkEXmYnLCviWAhzI+t/gFAk/TK1knIGTKJBJrTy5dAdIEmmjNpnUvy21yZ7qfLSfxXAxOAMfgblF+gw4J2kE+sDSIvgplK71mQLDb4EF51PNnra4BLgie62C5WxfggVPNPE9f4/rQM7SArTFZYnxOoyzf6c7cxJbH+wvzggAAAAASUVORK5CYII="/>

      <h1 className=' flex justify-center font-bold uppercase '> Study Material</h1>
     

    </div>
    <div className=" bg-white flex flex-col my-4 rounded-lg border-[5px] shadow-sm mx-2 justify-center shadow-black ">
      
    <img className=' w-[200px] mb-3' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvRJREFUSEvFllmojVEUx38XUURC3VCizFFebpkKeRDJVEQiDyK3DIUiyZApJMOD6UEkofAgQ1EkRYbIEDJnDiFJyLD/t/XpnN3+zre/26mzXu49+1t7/ff677XW/ldRIauqEC55gRsCfYGOQFs79GvgKXAF+B2bSCxwF2AxMBZomRL8I3AMWAs8yTpAFnBTYB1QCyjbGPsJbABWAvo/aKWARedxoJftVJAjjurTwC3gEdDIaO8DDHfr42xNW0T9KOBdCDkNuAdwEWhlm05Z1s8yUu4M7ACGmt8rq4mX/r4QcDVwHWhvzivc3+UxHJuPYq4HFtjve0AN8K0wRgj4EDDBnJbZXfm4KjDRK7sJfA4cbDMw19a3OJ95pYB72/3J5wQwMiXTwcA5+zYEOB/wUzFeAPoDv6wW1Hp15me817XCVKOlK/Df0QscA6wt3YA7VnBr3AGWhIAbAx+A5sB2K6a0q42hOtmr3h4DqDA7hYBViWftwwhAlVwOm+4KdbcFEosPfaqnAXvMQRWdRrNc8mSsIrxhcdXXmg1Fd7zQ2kDrTUpNHVdMsXecHPKTAauyVeFFwPOBjebQAvhaguc8wIr1xWIJY5MPPAk4YA7dgQdlAu4J3LVYEwHNiaKM9dxdMgcd4mCZgKcA+yyWJtg1H1g9/R5oDewHtCHN8lB92GU8HngLtAP++sD6vdNV8wzguzX/ixTkWGANEL1kmhHbgDlJPH9yyVFDXetnHPXDkhN6B4gB1sjUKB0I/HEs6uWSUqmz0CMhmifb91VOziwNZB3Tx1uB2bZ3FzCzME4IuA1w1Ya6fKUk9ErFWgNrmeRlum8PRdLLqRnrgzTWZU8IzAKeZ6BLQGjODzI/Tb8BNqeLtuaRPj+Ao8BJ4LZJHxWNBr/aRLNe0ifRZmJttKP4TeiwWWKvmXvSdM+qRlEYY9JmEoir6yv2CkE0yRaZvNUIDJnkrcSg3t2sK8kt6KUq+wEdPEH/2ApSbRNlWVRHBamPU8WA/wE+kZYfQn8AewAAAABJRU5ErkJggg=="/>

      <h1 className=' flex justify-center font-bold uppercase '> Updates</h1>
     

    </div>
  </div>
 </div>
  </>


  )}

  export default Home
