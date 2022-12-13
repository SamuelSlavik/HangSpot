import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {useParams, Link} from "react-router-dom"

import {Like, Spot} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {SvgIcon} from "@mui/material";
import UserContext from "../../context/userContext";

function PlaceDetail():JSX.Element {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

  const { id } = useParams()
  const [coordinates, setCoordinates] = useState({ lat: 49.19578860752985, lng: 16.606112965870675 })
  const [spot, setSpot] = useState<Spot>()
  const [likes, setLikes] = useState<Like>()

  const { userData, setUserData } = useContext(UserContext);

  const fetchLikes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/spots/likes/" + id,
        { headers: { "Authorization": "Bearer " + userData.token } })
      setLikes(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/get/" + id)
        setSpot(response.data)
        setCoordinates({lat: response.data.latitude, lng: response.data.longitude})
      } catch (e) {
        console.log(e)
      }
    }
    fetchData().catch(console.error)
    fetchLikes().catch(console.error)

  }, [])

  const like = async () => {
    try {
      const likeRes = await axios.patch("http://localhost:8000/api/spots/likes/" + id + "/",
        {},
        { headers: { "Authorization": "Bearer " + userData.token } })
    } catch (e) {
      console.log(e)
    }
    fetchLikes().catch(console.error)
  }

  return (
    <div className={"spot"}>
      <div className={"spot__map"}>
        {
          (!isLoaded) ? <div>Loading...</div> :
          <GoogleMap
            zoom={13}
            center={coordinates}
            mapContainerClassName="spot__map-inner"
          >
            <Marker position={coordinates} />
          </GoogleMap>
        }
      </div>
      <div className={"spot__content"}>
        {
          !spot ?
            <div>
              Loading data...
            </div> :
            <>
              <div className={"spot__header-wrapper"}>
                <h2>{spot?.name}</h2>
                {
                  likes?.user_in ?
                    <a onClick={like} style={{color: "#FF4D00"}}>
                      <SvgIcon component={ThumbUpOutlinedIcon} fontSize={"large"}/>
                    </a> :
                    <a onClick={like}>
                      <SvgIcon component={ThumbUpOutlinedIcon} fontSize={"large"}/>
                    </a>
                }
              </div>
              <p className={"coordinate"}>Latitude: {spot?.latitude}</p>
              <p className={"coordinate"}>Longitude: {spot?.longitude}</p>
              <br/>
              <p style={{marginBottom: 0}}>Category:</p>
              <p style={{marginTop: 0}} className={"text--large"}><b>{spot?.spot_type}</b></p>
              <div className={"spot__display-flex"}>
                <div>
                  <p style={{marginBottom: 0}}>Created by:</p>
                  <Link to={"/user/" + spot?.owner.id} style={{marginTop: 0}} className={"text--large"}><b>{spot?.owner.username}</b></Link>
                </div>
                {
                  !likes?.likes === undefined ?
                    <></> :
                    <div>
                      <p style={{marginBottom: 0}}>People liked:</p>
                      <p style={{marginTop: 0}} className={"text--large"}><b>{likes?.likes}</b></p>
                    </div>
                }
              </div>
              {
                !spot?.description ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Description:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot?.description}</p>
                  </>
              }
              {
                !spot?.park_near ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Parking options:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot?.park_description}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.seating_provided ?
                  <></> :
                  <>
                    <p className={"text--large"}>Seating nearby provided</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guarded ?
                  <></> :
                  <>
                    <p className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guard_free_time ?
                  <></> :
                  <>
                    <p className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guarded ?
                  <></> :
                  <>
                    <p className={"text--large"}>{spot.type_specific_data.guard_free_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.open_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Opened from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.open_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Closed from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.close_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.expected_duration ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Expected duration:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.expected_duration}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Path description:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.path_description}</p>
                  </>
              }
              <div>
                asjkdf bqwehbf asjhbf
                 ajhsdvfb hqwef asddf hbukhwqjeevf asd
                df qhuwevf asjhdldfv qwe
                -f- ashsugdfv oqgwehj f
                -asddfgvhuwe vfuhpasdbf
                we-0 fugasudvdf ghwjevh ff
                =0sdfdguvwe  fpuyuiu sabd df-
                0[wqe uf[ygiasd df uygbe pufy hasd
                =f uqweoeut vasdsouydfb
                w=e=ffu hustdd vfuqwyej f0][0psaif 97uwgewe f8yiuwhe ef
                0s f[iyg qweutofvsaddofij 7=qwe
                 fpyupuhsa dvfpwoqepi ff
                08]sydgfygwe
                fpuyuygwqef9
                jskdsf
                -hiwe e8y8yifiusdhf iugqweh f
                =]s-a f iygwqeb effygpisufuh r  pwiyegfbousydgd fb-q
                e0[ef f9gufb uweygjf pisudhfj
                wqe f8ysidhg bouweyg sydidfbilwe f7
                =we f]9asou gf b8ewiugf s
                ddf qwpueyhf sop'd f
                =qwe[0 fsoudfqwhewj0opf
                =wew[0fo hasoeuakgfjh we=
                e]-[ fiufn f-ae\e9[uof jp\p0[f u[qowrmf
                -w\qe[ fg vbwe f
                -pwhef [owue jf [gisdn f
                f-\p 9uhwb rf[ohwenf ]sbdn f
                08hiwem =
                e[d[figuh we]09pfu j[9eohsfd shodjf f
                we[ f]9[gsdun f
                [0we gfvbsd
                =f [uwebbfoc csidbf woeufh pasiduhf w-q\e[ f0]os8'hdn f]-\[w0'ep fiysvhdbd f
                ]w-e rf[gidf
                awefouh s-d0fu ygweqh]-[f-n
                s0\dpfpvwibef o[sidufh
                =wefpuisd f]0[weouhf j
                sd[0ouf hso';f i n \-plwegbf f'p/s;s.d yfhgv;wpe'
                \sdfi;oWE
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default PlaceDetail