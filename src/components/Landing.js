import React , {useEffect , useState} from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
//import { IoMdSearch } from "react-icons/io";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import NoImage from './NoImage';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Landing = () => {

  const [show, setShow] = useState(false);
  const [getdata, setGetdata] = useState([]);
  const [desc , setDesc] = useState([]);
  const [category, setCategory] = useState('CSPM');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = async(ele) => {
    if(ele?.display === false){
      ele.display = true;
    }
    else{
      ele.display = false;
    }
    localStorage.setItem('data', JSON.stringify(getdata));
    handleChange(category);
    handleClose();
  }

  const handleChange = async(category1) => {
    setCategory(category1);
    for(let i = 0 ; i < getdata.length ; i++){
        if(getdata[i].shorthand === category1){
          setDesc(getdata[i].widgets);
          break;
        }
    }
  }

  const landingFunc = async() => {
    let exist = await JSON.parse(localStorage.getItem("data"));
    if(exist == null){ 
      exist = [];
    }
    setGetdata(exist.data);
  }
  useEffect(() => {
    landingFunc();
    // eslint-disable-next-line
  },[])
  return (
    <div className='container-fluid'>
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold"> CNAPP Dashboard </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"> </ul>
            <div className="navbar-text">
              <Button variant="light" onClick={() => {handleShow() ; handleChange(category);}} className='border me-3'>
                Add Widget <IoIosAdd/>
              </Button>
              {/*<button className='btn border me-3'> Search Widget <IoMdSearch/> </button>*/}
              <button className='btn border me-3'> <MdRestartAlt/> </button>
              <button className='btn border me-3'> <BsThreeDotsVertical/> </button>
              <button className='btn border'> <MdWatchLater className='border'/> Last 2 Days <RiArrowDropDownLine/> </button>
              <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Widget</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className='mt-n5 mb-3'> Personalise your desktop by adding the following widget </div>
                  <div className='row mb-3'>
                    <button className='col btn border-bottom' onClick={() => handleChange('CSPM')}>
                      CSPM
                    </button>
                    <button className='col btn border-bottom' onClick={() => handleChange('CWPP')}>
                      CWPP
                    </button>
                    <button className='col btn border-bottom' onClick={() => handleChange('Images')}>
                      Images
                    </button>
                    <button className='col btn border-bottom' onClick={() => handleChange('Ticket')}>
                      Ticket
                    </button>
                  </div>
                  {desc?.map(d => { 
                    return(
                    <div key={d?.name} className='border mb-2 p-1'>
                      <button className='btn' onClick={() => handleCheckboxChange(d)}> 
                        {d?.display === true ? <FaCheckSquare/> : <FaRegSquare/>} 
                      </button> 
                      {d?.name}
                    </div>
                  )})}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>           
        </div>
      </div>
      <div>
        {getdata?.map(p => { return(
          <div key={p.name} className='container-fluid ms-2'>
            <div className='mb-3 ms-2 text-start fw-bold'> {p?.name} </div>
            <div className='container-fluid d-flex mb-3'>
              {p?.widgets.map(c => (
                <div key={c?.name}>
                  {c?.display === false ? <></> : <div className="card me-5" style={{width: '20rem' , height : "12rem"}} key={c.name}>
                    <div className='ms-2 mt-1 text-start fw-bold'> {c?.name} </div>
                    <div className="card-body">
                      {c.image.length === 0 ? <NoImage/> : <img src={c?.image} alt='garph-data' className='mt-3'/>}
                    </div>
                  </div>
                  }
                </div>
              ))}
              <div className="card" style={{width: '20rem' , height : "12rem"}}>
                <div className='card-body d-flex justify-content-center align-items-center'>
                  <Button variant="light" onClick={() => {handleShow() ; handleChange(category);}} className='border me-3'>
                    Add Widget <IoIosAdd/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Landing;