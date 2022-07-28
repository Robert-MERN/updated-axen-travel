import React, { useState, useEffect } from 'react'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../components/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import Loading from '../components/Loading';
import { setAlert, resetAlert } from "../redux/alertSlice";
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Data from "../importantData/cityAndAirportInfo.json";
import DatePicker from 'react-date-picker'





function BookingFlightPage() {
    useEffect(() => {
        document.getElementById("topSection").scrollIntoView({ behavior: "auto" });
        document.getElementById("website-title").innerHTML = "AXEN HOLIDAYS | CHECKOUT"
      }, []);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const DATA = state[0];
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [userInfo, setUserInfo] = useState({ holder: "true", dateOfBirth: new Date(), expiryDate: new Date(), issuanceDate: new Date() });
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");
    const [value5, setValue5] = useState("");
    const [value6, setValue6] = useState("");
    const [value7, setValue7] = useState("");
    const [value8, setValue8] = useState("");
    const [terms, setTerms] = useState(false);

    const onChange = (e) => {
        if (e.target.name === "firstName" || e.target.name === "lastName") {
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value.toUpperCase() })
        } else {
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
        }
    }
    const handleDateChange = (key, val) => {
        const date = new Date(val);
        const actualDate = new Date(date.setDate(date.getDate() + 1)).toISOString().split("T")[0]
        setUserInfo({ ...userInfo, [key]: actualDate });
    }
    const minMaxDate = (target) => {
        const date = new Date();
        if (target === "birth") {
            // date of birth max
            return new Date(date.setFullYear(date.getFullYear - 12));


        } else if (target === "issuance") {
            // issuance Date of passport max
            return new Date(date.setFullYear(date.getFullYear));

        } else if (target === "expiry") {
            // expiry date of passport        
            return new Date(date.setFullYear(date.getFullYear));
        }
    }


    const searchChange = (key, value) => {
        if (key === "countryCallingCode") {
            setUserInfo({ ...userInfo, [key]: value.split("+")[1] })
        } else {
            setUserInfo({ ...userInfo, [key]: value });
        }
        setValue("");
        setValue2("");
        setValue3("");
        setValue4("");
        setValue5("");
        setValue6("");
        setValue7("");
        setValue8("");
    }
    const clearOnBackspace = (e, key) => {
        if (e.code === "Backspace" && userInfo[key]) {
            setValue("");
            setUserInfo({ ...userInfo, [key]: "" })
        }
    }
    const clearOnCancel = (num, key) => {
        setUserInfo({ ...userInfo, [key]: "" })
        if (num === 1) {
            setValue("");
        } else if (num === 2) {
            setValue2("");
        } else if (num === 3) {
            setValue3("")
        } else if (num === 4) {
            setValue4("")
        } else if (num === 5) {
            setValue5("")
        } else if (num === 6) {
            setValue6("")
        } else if (num === 7) {
            setValue7("")
        } else if (num === 8) {
            setValue8("")
        }
    }
    console.log(userInfo);

    // coverting Date Function
    const formatDate = (unformat) => {
        const unformatDate = new Date(unformat);
        return unformatDate.toLocaleString("en-us", { day: "numeric", weekday: "short", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).toString().split(",").join("");
    }

    // grabbing city name function
    let information = [];
    const DataChild = Data.map((a) => {
        return Object.entries(a)
    });
    DataChild.map((i) => {
        return i.map(i => information.push(i[1]))
    });
    const findCity = (iataCode) => {
        return information.find(i => i.iata === iataCode)?.city
    }
    // cabin 
    const cabin = DATA.itineraries[0].segments[0].co2Emissions[0].cabin


    // all details
    // departure city name
    const departCity = DATA.itineraries[0].segments[0].departure.iataCode;
    // arrival city name 
    const arriveCity = DATA.itineraries[0].segments[DATA.itineraries[0].segments.length - 1].arrival.iataCode;
    // departure date 
    const departDate = formatDate(DATA.itineraries[0].segments[0].departure.at);
    // arrival date 
    const arriveDate = formatDate(DATA.itineraries[1].segments[DATA.itineraries[1].segments.length - 1].arrival.at);
    // price
    const grandTotal = DATA.price.grandTotal

    // checkout
    const book = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("https://axen-trave-test.herokuapp.com/api/flight/flightCreateOrder", { traveler: userInfo, flight: DATA });
            setIsLoading(false);
            console.log(res)
            // navigate("/choose-payment", { state: res.data });
            dispatch(setAlert("bookFlight"));
            setTimeout(() => {
                dispatch(resetAlert())
            }, 2500)
            clearTimeout();
        } catch (err) {
            setError(err);
            setIsLoading(false);
            alert.error("there Could be a server error! or this is the beta mode and so many passengers booking at the same time, might be this seat already has been reserved.")
        }

    }
    return (
        <div id="topSection">
            <div id="main topSection">
                <TopBarOne />
                <TopBarTwo />
                <div id="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <form autoComplete='off' action="" onSubmit={book}>
                                    <h3 className="text-center hch2">{findCity(departCity)} To {findCity(arriveCity)} (Round-trip)</h3>
                                    <div className="clearfix"></div>
                                    <p className="address text-center">{findCity(departCity)} ({departCity}) / {findCity(arriveCity)}  ({arriveCity})</p>

                                    <div className="clearfix"></div>
                                    <div className="col-md-4 booking-row">
                                        <h3 className="line">TRAVELLER INFORMATION</h3>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>First Name</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input autoComplete='off' required onChange={onChange} name='firstName' type="text" className="form-control" placeholder="Michael" spellCheck="false" />
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Last Name</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}  >
                                                <input autoComplete='off' onChange={onChange} required name='lastName' type="text" className="form-control" placeholder="Berkovich" spellCheck="false" />
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper  flex items-center">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Date of Birth</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                {/* <input autoComplete='off' onChange={onChange} required name="dateOfBirth" type="date" className="form-control" spellCheck="false" /> */}
                                                <DatePicker clearIcon={null} minDate={minMaxDate("birth")} className="border-none" value={new Date(userInfo["dateOfBirth"])} onChange={(newDate) => handleDateChange("dateOfBirth", newDate)} format="y-MM-dd" ></DatePicker>



                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Your Email</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input autoComplete='off' onChange={onChange} required name='email' type="email" className="form-control" placeholder="your@email.com" spellCheck="false" />
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Gender</label>
                                            <div className="select1_inner col-md-5" style={{ marginTop: "12px", paddingRight: "0", paddingLeft: "0", width: "20%", display: "inline-block" }}>
                                                <select onChange={onChange} name='gender' required className="select2 select select3" style={{ width: "100%", outline: "none" }}>
                                                    <option selected disabled >Gender</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top"></div>
                                        <h3>PASSPORT INFORMATION</h3>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Birth Place</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required name="birthPlace" placeholder="Search city" onKeyDown={(e) => clearOnBackspace(e, "birthPlace")} onChange={(e) => setValue(e.target.value)} type="text" className="form-control" value={value || userInfo.birthPlace} spellCheck="false" />
                                                        {(value || userInfo.birthPlace) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(1, "birthPlace")} />
                                                        }
                                                    </div>
                                                    {value &&
                                                        <Search chracter={value} placingOrder="city" searchChange={searchChange} name="birthPlace" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Issuance Location</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required name="birthPlace" placeholder="Search city" onKeyDown={(e) => clearOnBackspace(e, "issuanceLocation")} onChange={(e) => setValue2(e.target.value)} type="text" className="form-control" value={value2 || userInfo.issuanceLocation} spellCheck="false" />
                                                        {(value2 || userInfo.issuanceLocation) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(2, "issuanceLocation")} />
                                                        }
                                                    </div>
                                                    {value2 &&
                                                        <Search chracter={value2} placingOrder="city" searchChange={searchChange} name="issuanceLocation" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper  flex items-center">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Issuance Date</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                {/* <input autoComplete='off' onChange={onChange} required name="issuanceDate" type="date" className="form-control" spellCheck="false" /> */}
                                                <DatePicker clearIcon={null} minDate={minMaxDate("issuance")} className="border-none" value={new Date(userInfo["issuanceDate"])} onChange={(newDate) => handleDateChange("issuanceDate", newDate)} format="y-MM-dd" ></DatePicker>
                                            </div>
                                        </div>
                                        <div className="select1_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Passport Number</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input autoComplete='off' onChange={onChange} placeholder="00000000" required name="passportNumber" type="phone" className="form-control" spellCheck="false" />
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Calling Code</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="+92" name="countryCallingCode" onKeyDown={(e) => clearOnBackspace(e, "countryCallingCode")} onChange={(e) => setValue8(e.target.value)} type="text" className="form-control" value={value8 || userInfo.countryCallingCode} spellCheck="false" />
                                                        {(value8 || userInfo.countryCallingCode) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(8, "countryCallingCode")} />
                                                        }
                                                    </div>
                                                    {value8 &&
                                                        <Search chracter={value8} placingOrder="country" searchChange={searchChange} name="countryCallingCode" countryBool="calling_code" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Phone Number</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input autoComplete='off' onChange={onChange} placeholder="0311-2396511" required name="number" type="phone" className="form-control" spellCheck="false" />
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper flex items-center">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Expiry Date</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                {/* <input autoComplete='off' onChange={onChange} required name="expiryDate" type="date" className="form-control" spellCheck="false" /> */}
                                                <DatePicker clearIcon={null} minDate={minMaxDate("expiry")} className="border-none" value={new Date(userInfo["expiryDate"])} onChange={(newDate) => handleDateChange("expiryDate", newDate)} format="y-MM-dd" ></DatePicker>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Issuance Country</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="Search Country" name="issuanceCountry" onKeyDown={(e) => clearOnBackspace(e, "issuanceCountry")} onChange={(e) => setValue3(e.target.value)} type="text" className="form-control" value={value3 || userInfo.issuanceCountry} spellCheck="false" />
                                                        {(value3 || userInfo.issuanceCountry) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(3, "issuanceCountry")} />
                                                        }
                                                    </div>
                                                    {value3 &&
                                                        <Search chracter={value3} placingOrder="country" searchChange={searchChange} name="issuanceCountry" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Validity Country</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="Search Country" name="validityCountry" onKeyDown={(e) => clearOnBackspace(e, "validityCountry")} onChange={(e) => setValue4(e.target.value)} type="text" className="form-control" value={value4 || userInfo.validityCountry} spellCheck="false" />
                                                        {(value4 || userInfo.validityCountry) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(4, "validityCountry")} />
                                                        }
                                                    </div>
                                                    {value4 &&
                                                        <Search chracter={value4} placingOrder="country" searchChange={searchChange} name="validityCountry" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Nationality</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="Search Country" name="nationality" onKeyDown={(e) => clearOnBackspace(e, "nationality")} onChange={(e) => setValue5(e.target.value)} type="text" className="form-control" value={value5 || userInfo.nationality} spellCheck="false" />
                                                        {(value5 || userInfo.nationality) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(5, "nationality")} />
                                                        }
                                                    </div>
                                                    {value5 &&
                                                        <Search chracter={value5} placingOrder="country" searchChange={searchChange} name="nationality" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="select1_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Holder</label>
                                            <div className="select1_inner col-md-5" style={{ marginTop: "12px", paddingRight: "0", paddingLeft: "0", width: "20%", display: "inline-block" }}>
                                                <select onChange={onChange} name='holder' className="select2 select select3" style={{ width: "100%", outline: "none" }}>
                                                    <option selected value="true" >Yes</option>
                                                    <option value="false" >No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top"></div>
                                        <h3>BILLING ADDRESS</h3>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Country</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="Search Country" name="billingCountry" onKeyDown={(e) => clearOnBackspace(e, "billingCountry")} onChange={(e) => setValue6(e.target.value)} type="text" className="form-control" value={value6 || userInfo.billingCountry} spellCheck="false" />
                                                        {(value6 || userInfo.billingCountry) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(6, "billingCountry")} />
                                                        }
                                                    </div>
                                                    {value6 &&
                                                        <Search chracter={value6} placingOrder="country" searchChange={searchChange} name="billingCountry" countryBool="name" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>City</label>
                                            <div className="col-md-7  relative" style={{ paddingRight: "0", paddingLeft: "0" }} >
                                                <div className="select1_wrapper">
                                                    <div className="input1_inner" style={{ border: "none", boxShadow: "none", display: "flex", alignItems: "center", cursor: "text" }} >
                                                        <input autoComplete='off' required placeholder="Search City" name="billingCity" onKeyDown={(e) => clearOnBackspace(e, "billingCity")} onChange={(e) => setValue7(e.target.value)} type="text" className="form-control" value={value7 || userInfo.billingCity} spellCheck="false" />
                                                        {(value7 || userInfo.billingCity) &&
                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={() => clearOnCancel(7, "billingCity")} />
                                                        }
                                                    </div>
                                                    {value7 &&
                                                        <Search chracter={value7} placingOrder="city" searchChange={searchChange} name="billingCity" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Address</label>
                                            <div className="col-md-7 relative" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input autoComplete='off' onChange={onChange} name="address" required type="text" className="form-control" placeholder="5c3/5" spellCheck="false" />
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 booking-row">
                                        <h3 className="line">FLIGHTS SUMMARY</h3>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Flying from:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">{findCity(departCity)}</span>
                                                <br />{findCity(departCity)} ({departCity})
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>To:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">{findCity(arriveCity)}</span>
                                                <br />{findCity(arriveCity)} ({arriveCity})
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Departing:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">At</span>
                                                <ul>
                                                    <li>{departDate}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Returning:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">At</span>
                                                <ul>
                                                    <li>{arriveDate}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top"></div>
                                        <h3>CHARGES</h3>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Cabin:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">{cabin}</span>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Fees</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">Included</span>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>TOTAL</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">£ {grandTotal}</span>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top" style={{ marginTop: "40px" }}></div>
                                        <div className="border-3px"></div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top"></div>
                                        <h3>ACCEPT AND CONFIRM</h3>
                                        <input required type="checkbox" onChange={() => setTerms(!terms)} name='termsAndConditions' /> <b style={{ color: "#464646", paddingLeft: "10px" }}>I agree to the booking conditions</b>
                                        <div className="margin-top"></div>
                                        <div className="clearfix"></div>
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "18px", fontSize: "16px" }}>GRAND TOTAL:</label>
                                            <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red" style={{ fontSize: "30px" }}>£ {grandTotal}</span>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="margin-top"></div>
                                        <button type='submit' to="booking-success.html" className="btn btn-default btn-cf-submit3">BOOKING NOW</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {isLoading &&
                <Loading />
            }
        </div>
    )
}

export default BookingFlightPage