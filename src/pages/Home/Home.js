import React , { useEffect,useState,useContext,useRef } from 'react';
import Carousel from './Carousel';
import Products from './Products';
import styled from 'styled-components';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.div`
  width:100vw;
  overflow:hidden;
`
const Cat = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:300px;
  height:300px;
  position:absolute;
  cursor:pointer;
  top: ${(props)=> props.position.top};
  left: ${(props)=> props.position.left};
`
const CatImg = styled.img`
  width:100%;
  height:100%;
`
const CatP = styled.span`
  position: relative;
  background-color: #BDB0A4;
  color: white;
  font-size:20px;
  padding:15px;
  width:fit-content;
  border-radius:20px;
  &:after{
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #BDB0A4;
    border-top: 0;
    border-right: 0;
    margin-left: -10px;
    margin-top: -20px;
  }
`

const Scroll = styled.div`
  display: flex;
  align-items:center;
  background: #BDB0A4;
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
const CouponWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`
const CouponBlock = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:flex-start;
  padding: 20px 60px; 
  padding-left: 100px;
  height: fit-content;
  background-color:lightgray;
`
const Coupon = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  width:200px;
  height:100px;
  margin:5px;
  cursor: pointer;
  background-color:#F9F2ED;
  &:hover{
    cursor: pointer;
    background-color:white;
  }
`
const CouponContext = styled.div`
  padding-top:10px;
  display:flex;
  gap:5px;
  flex-direction:column;
  align-items:center;
`
const CouponText = styled.span`
  font-size:15px;
`
const CouponDay = styled(CouponText)`
  color:red;
  font-weight:700;
`
const CouponTitle = styled(CouponText)`
  font-size:17px;
  font-weight:600;
`
const CouponDiscount = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  color:#F9F2ED;
  font-weight:700;
  font-size:20px;
  height:50px;
  width:100%;
  border-top: 2px dotted #F9F2ED;
  background-color:${({ category, amount }) => amount === 0 ? 'gray' : category === 'delivery' ? '#00B29D' : '#F87474'};
`

function Home() {
  const [counpons, setCoupons] = useState();
  const [position, setPosition] = useState({ top: "700px", left: "300px" });
  const [catClicked, setCatClicked] = useState(false);
  const { user, isLogin, jwtToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const intervalRef = useRef();

  useEffect(() => {
    async function getCoupons() {
      const { data } = await api.getCoupons();
      setCoupons(data);
    }
    getCoupons();
  }, []);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setPosition({
        top: Math.floor(Math.random() * window.innerHeight + window.scrollY/2) + 700 + "px",
        left: Math.floor(Math.random() * window.innerWidth) - 150 + "px",
      });
    }, 3650);

  }, []);

  if (!counpons) {
    return
  }

  return (
    <Wrapper>
      <Carousel />
      <Scroll>
        <ScrollText>
          限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 相 愛 相 殺 !!
        </ScrollText>
        <ScrollText>
          限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !! 限 時 免 運 !! 超 狂 折 價 !! 限 量 瘋 搶 !!
        </ScrollText>
      </Scroll>
      <CouponWrapper>
        <CouponBlock>
          {counpons.activity.length !== 0 && counpons.activity.map((coupon) => {
            return(
              <Coupon key={coupon.id} onClick={isLogin? () => api.userGetCoupon({user_id:user.id, coupon_id:coupon.id}, jwtToken):() => navigate('/profile')}>
                <CouponContext>
                  <CouponTitle>{coupon.name}</CouponTitle>
                  <CouponText>
                    <CouponText>剩下</CouponText><CouponDay>{coupon.day_left}</CouponDay><CouponText>天!</CouponText>
                  </CouponText>
                  <CouponDiscount category={'activity'} amount={coupon.total}>{coupon.total === 0 ? '下次請早':'點我瘋搶'}</CouponDiscount>
                </CouponContext>
              </Coupon>
            );
          })}
          {counpons.delivery.length !== 0 && counpons.delivery.map((coupon) => {
            return(
              <Coupon key={coupon.id} onClick={isLogin? () => api.userGetCoupon({user_id:user.id, coupon_id:coupon.id}, jwtToken):() => navigate('/profile')}>
                <CouponContext>
                  <CouponTitle>{coupon.name}</CouponTitle>
                  <CouponText>
                    <CouponText>剩下</CouponText><CouponDay>{coupon.day_left}</CouponDay><CouponText>天!</CouponText>
                  </CouponText>
                  <CouponDiscount category={'delivery'} amount={coupon.total}>{coupon.total === 0 ? '下次請早':'點我瘋搶'}</CouponDiscount>
                </CouponContext>
              </Coupon>
            );
          })}
        </CouponBlock>
      </CouponWrapper>
      <Products />
      <Cat position={position} onClick={() => {
        window.clearInterval(intervalRef.current);
        setCatClicked(true);
        }}>
        <CatImg src={catClicked? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNiZTFhYzM2YWRjYjkwNTI1ZDRhMjU0ZmQ5NTE4Zjc5OTMyNGMxMyZjdD1z/OBhjqeFg5LuYSj78qe/giphy.gif':'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODQ5Mzc4YzUzYWJlZGMxZGUwZDdiODI4OTk0ZGU0ZDAxNjZiNmYzYyZjdD1z/tn3Ej47sHXpgaxn3FZ/giphy.gif'}/>
        <CatP>{catClicked? '我 在 某 個 產 品 裡 等 你 唷 !':'來 抓 我 吧 ~'}</CatP>
      </Cat>
    </Wrapper>
  );
}


export default Home;
