import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import api from '../../utils/api';
import { AuthContext } from '../../context/authContext';

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
  @media screen and (max-width: 1279px) {
  width: 290px;
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

function Profile() {
  const { user, isLogin, login, logout, loading, jwtToken } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    "data": {
      "provider": "native",
      "user_id": 230,
      "role_id": 2,
      "name": "admin",
      "email": "admin@gmail.com",
      "picture": null,
      "activity": [
        {
          "id": 1,
          "name": "限時200元折扣碼",
          "description": "光棍節最新優惠",
          "start_date": "2023-03-17",
          "expire_date": "2023-06-17",
          "day_left": 90,
          "discount": 200,
          "minimum": 1000,
          "product_category": "all"
        },
        {
          "id": 3,
          "name": "新戶50元抵用券",
          "description": "新戶優惠！！！",
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
          "name": "限時免運券！",
          "description": "年終最新優惠",
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
          "name": "免運券！",
          "description": "年終最新優惠",
          "start_date": "2023-04-17",
          "expire_date": "2023-04-27",
          "day_left": 10,
          "discount": 30,
          "minimum": 0,
          "product_category": "all",
          "total": 4000
        }
      ],
      "points": 50,
      "points_percent": 0.02,
      "level": "鑽石",
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
      <LogoutButton onClick={login}>登入</LogoutButton>
    );
  }

  const renderCoupon = () => {
    if (!userProfile.data.activity) {
      return
    }
    if (isLogin) return (
      <CouponWrapper>
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
