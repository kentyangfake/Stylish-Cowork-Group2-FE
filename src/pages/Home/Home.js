import React , { useEffect,useState,useContext } from 'react';
import Carousel from './Carousel';
import Products from './Products';
import styled from 'styled-components';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

// const Cat = styled.div`
//   width:100px;
//   height:100px;
//   border-radius:50px;
//   background-color:olive;
//   position:absolute;
//   top: ${(props)=> props.position.top};
//   left: ${(props)=> props.position.left};
// `

const Scroll = styled.div`
  display: flex;
  background: red;
  height: 40px;
  width:100%;
`
const ScrollText = styled.div`
  color:white;
  font-weight:700px;
  font-size:30px;
  white-space: nowrap;
  text-transform: uppercase;
  animation: scroll 40s linear infinite;
  &:nth-child(2){
    animation: scroll2 40s linear infinite;
    animation-delay: -20s;

    @keyframes scroll{
      from{transform: translateX(100%)}
      to{transform: translateX(-100%)}
    }

    @keyframes scroll2{
      from{transform: translateX(0%)}
      to{transform: translateX(-200%)}
    }
  }
`
const CouponBlock = styled.div`
  display:flex;
  justify-content:space-between;
  padding: 20px 60px; 
  height: fit-content;
  width:100%;
  background-color:gray;
`
const Coupon = styled.div`
  display:flex;
  width:100px;
  height:200px;
  padding:5px;
  border: 1px solid lightgray;
  border-radius:10px;
`
function Home() {
  const [counpons, setCoupons] = useState();
  // const [position, setPosition] = useState({ top: "700px", left: "300px" });
  const { user, isLogin, jwtToken } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    async function getCoupons() {
      const { data } = await api.getCoupons();
      setCoupons(data);
    }
    getCoupons();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPosition({
  //       top: Math.floor(Math.random() * window.innerHeight) + 700 + "px",
  //       left: Math.floor(Math.random() * window.innerWidth) + "px",
  //     });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  if (!counpons) {
    return
  }

  return (
    <>
      <Carousel />
        <Scroll>
          <ScrollText>
            限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !!
          </ScrollText>
          <ScrollText>
            限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !!
          </ScrollText>
        </Scroll>
        <CouponBlock>
          {counpons.activity.length !== 0 && counpons.activity.map((coupon) => {
            return(
              <Coupon key={coupon.id} onClick={isLogin? () => api.userGetCoupon({user_id:user.id, coupon_id:coupon.id}, jwtToken):() => navigate('/profile')}>Lorem</Coupon>
            );
          })}
        </CouponBlock>
      <Products />
      {/* <Cat position={position}/> */}
    </>
  );
}

export default Home;
