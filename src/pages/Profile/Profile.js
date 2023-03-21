import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';
import queryString from "query-string";

const Wrapper = styled.div`
  display: flex;
`;

const ProfilerWrapper = styled.div`
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const CouponWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const FormFieldSet = styled.fieldset`
  margin-top: 50px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;
const FormLegend = styled.legend`
  line-height: 19px;
  font-size: 16px;
  font-weight: bold;
  color: #3f3a3a;
  padding-bottom: 16px;
  border-bottom: 1px solid #3f3a3a;
  width: 100%;
`;
const CouponGroup = styled.div`
  display:flex;
  flex-wrap:wrap;
  width: 750px;
  gap:15px;
  margin-top:15px;
  @media screen and (max-width: 1279px) {
    max-width: 100%;
    justify-items:center;
  }
`;
const DeliveryGroup = styled(CouponGroup)`
  width: 510px;

@media screen and (max-width: 1279px) {
  width: 100%;
}
`
const Coupon = styled.div`
  display:flex;
  justify-content: space-between;
  width:230px;
  height:100px;
  background-color: #F9F2ED;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
  width: 290px;
  }
  &:hover{
    background-color:white;
    border:1px dotted lightgray;
  }
`
const CouponContext = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  width:70%;
  height:100%;
`
const CouponDiscount = styled.div`
  display:flex;
  align-items:center;
  justify-items:center;
  flex-wrap:wrap;
  padding-top:10px;
  color:#F9F2ED;
  writing-mode:vertical-lr;
  font-weight:700;
  font-size:25px;
  height:100%;
  width:30%;
  border-left: 2px dotted #F9F2ED;
  background-color:${({ category }) => category === 'delivery' ? '#00B29D' : '#F87474'};
`
const CouponTitle = styled.span`
  font-size:20px;
  font-weight:700;
  padding-bottom:10px;
  border-bottom:1px solid #3f3a3a;
  margin-bottom:5px;
`
const CouponText = styled.span`
  line-height: 19px;
  font-size:12px;
`
const CouponDate = styled(CouponText)`
  font-weight:600;
  padding-left:5px;
`
const CouponLink = styled(Link)`
  color:#F9F2ED;
  font-weight:400;
  font-size:12px;
  text-decoration: none;
`
const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;
const Photo = styled.img`
  margin-top: 24px;
`;
const Content = styled.div`
  margin-top: 24px;
`;
const LogoutButton = styled.button`
  margin-top: 24px;
`;
const Loading = styled(ReactLoading)`
  margin-top: 50px;
`;
const BackEndButton = styled(Link)`
  width:100px;
  height: 50px;
  background-color:gray;
  margin-top: 24px;
`;
const Madel = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  font-weight:900;
  color: white;
  width: 50px;
  height: 50px;
  border-radius:20px;
  border: 5px solid ${({ level }) => {
    switch(level){
      case 'Bronze':
        return '#B0A397';
      case 'Silver':
        return '#B5B6B1';
      case 'Gold':
        return '#FFFAEC';
      case 'Platinum':
        return '#F3FFFB';
      case 'Titanium':
        return '#E5F6F9';
      default:
        return '#B6B6B6';
    }
  }};
  background-image: ${({ level }) => {
    switch(level){
      case 'Bronze':
        return 'linear-gradient(144deg,#B58A6C, #8D633D 60%,#B0A397)';
      case 'Silver':
        return 'linear-gradient(144deg,#E2E1DD, #B5B6B1 60%,#B5B6B1)';
      case 'Gold':
        return 'linear-gradient(144deg,#B8AA85, #BA9D51 60%,#FFFAEC)';
      case 'Platinum':
        return 'linear-gradient(144deg,#D6DFD7, #C4D4CB 60%,#F3FFFB)';
      case 'Titanium':
        return 'linear-gradient(144deg,#D9CED6, #C4E8D0 60%,#E5F6F9)';
      default:
        return 'linear-gradient(144deg,#5B5B5B, #000000 60%,#B6B6B6)';
    }
  }};
`
const MemberText = styled.span`
  line-height: 19px;
  font-size:12px;
`


function Profile() {
  const { user, isLogin, login, logout, loading, jwtToken } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    "data": {
      "provider": "native",
      "user_id": 230,
      "role_id": 2,
      "name": "",
      "email": "",
      "picture": null,
      "activity": [
        {
          "id": 1,
          "name": "測試coupon",
          "description": "測試用",
          "start_date": "2023-03-17",
          "expire_date": "2023-06-17",
          "day_left": 90,
          "discount": 200,
          "minimum": 1000,
          "product_category": "all"
        },
        {
          "id": 3,
          "name": "測試coupon",
          "description": "測試用",
          "start_date": "2023-03-17",
          "expire_date": "2023-03-27",
          "day_left": 10,
          "discount": 50,
          "minimum": 0,
          "product_category": "all"
        }
      ],
      "delivery": [
        {
          "id": 2,
          "name": "測試coupon",
          "description": "測試用",
          "start_date": "2023-03-17",
          "expire_date": "2023-03-27",
          "day_left": 10,
          "discount": 30,
          "minimum": 0,
          "product_category": "all",
          "total": 4000
        },
        {
          "id": 4,
          "name": "測試coupon",
          "description": "測試用",
          "start_date": "2023-04-17",
          "expire_date": "2023-04-27",
          "day_left": 10,
          "discount": 30,
          "minimum": 0,
          "product_category": "all",
          "total": 4000
        }
      ],
      "points": 0,
      "points_percent": 0.02,
      "level": "Bronze",
      "promo_link": "AJEKGE",
      "accumulate": 2450
    }
  });
  useEffect(()=>{
    const getUserProfile = async () => {
      if(!jwtToken){
        return
      }
      const data = await api.getProfile(jwtToken);
      setUserProfile(data);
    }
    getUserProfile();
  }, [jwtToken]);

  const parsed = queryString.parse(window.location.search);

  const renderContent = () => {
    if (loading) return <Loading type="spinningBubbles" color="#313538" />;
    if (isLogin) return (
      <>
        <Photo src={user.picture} />
        <Content>{user.name}</Content>
        <Content>{user.email}</Content>
        {userProfile.data.role_id === 1 ? <BackEndButton to="/backend">Coupon管理後台</BackEndButton> : []}
        <LogoutButton
          onClick={logout}
        >
          登出
        </LogoutButton>
      </>
    );
    return (
      <LogoutButton onClick={() => login(parsed)}>登入</LogoutButton>
    );
  }

  const renderCoupon = () => {
    if (!userProfile.data.activity) {
      return
    }
    if (isLogin) return (
      <CouponWrapper>
        <FormFieldSet>
          <FormLegend>會員等級</FormLegend>
          <CouponGroup>
            <Madel level={userProfile.data.level}>{userProfile.data.level.slice(0,1)}</Madel>
            <MemberText>會員等級: {userProfile.data.level}</MemberText>
            <MemberText>會員積分: {userProfile.data.points} P</MemberText>
            <MemberText>
              <MemberText>分享連結拿積分: https://stylish-plus.web.app/profile?promo={userProfile.data.promo_link}</MemberText>
            </MemberText>
          </CouponGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>我的折價券</FormLegend>
          <CouponGroup>
          {userProfile.data.activity.length !== 0? userProfile.data.activity.map((coupon) => (
            <Coupon key={coupon.id}>
                <CouponContext>
                  <CouponTitle>
                    {coupon.name}
                  </CouponTitle>
                  <CouponText>
                    <CouponText>Valid Until</CouponText>
                    <CouponDate>{coupon.expire_date}</CouponDate>
                  </CouponText>
                  <CouponText>
                    {coupon.description}
                  </CouponText>
                </CouponContext>
              <CouponDiscount category={'activity'}>$ {coupon.discount} <CouponLink to='/'> ▸ 去逛逛</CouponLink></CouponDiscount>
            </Coupon>
          )) : <p>可憐,沒有任何券</p>}
          </CouponGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>我的免運券</FormLegend>
          <DeliveryGroup>
          {userProfile.data.delivery.length !== 0? userProfile.data.delivery.map((coupon) => (
            <Coupon key={coupon.id}>
                <CouponContext>
                  <CouponTitle>
                    {coupon.name}
                  </CouponTitle>
                  <CouponText>
                    <CouponText>Valid Until</CouponText>
                    <CouponDate>{coupon.expire_date}</CouponDate>
                  </CouponText>
                  <CouponText>
                    {coupon.description}
                  </CouponText>
                </CouponContext>
              <CouponDiscount category={'delivery'}>$ {coupon.discount} <CouponLink to='/'> ▸ 去逛逛</CouponLink></CouponDiscount>
            </Coupon>
          )) : <p>可憐,沒有任何券</p>}
          </DeliveryGroup>
        </FormFieldSet>
      </CouponWrapper>
    );
  }
  return (
    <Wrapper>
      <ProfilerWrapper>
        <Title>{isLogin?'會員基本資訊':'請先登入'}</Title>
        {renderContent()}
      </ProfilerWrapper>
      {renderCoupon()}
    </Wrapper>
  );
}

export default Profile;
