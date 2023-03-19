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
  justify-content:space-between;
  width:230px;
  height:100px;
  padding:5px;
  border: 1px solid lightgray;
  border-radius:10px;
  @media screen and (max-width: 1279px) {
  width: 290px;
}
`
const CouponTitle = styled.div`
  display:flex;
  flex-direction:column;
  background-color:${({ category }) => category === 'delivery' ? 'green' : 'red'};
  border-radius:5px;
  height:100%;
`
const CouponContext = styled.div`
  display:flex;
  flex-direction:column;
  height:100%;
`
const CouponDiscount = styled.div`
  display:flex;
  align-items:center;
  justify-items:center;
  padding-top:10px;
  writing-mode:vertical-lr;
  font-weight:700;
  font-size:25px;
  height:100%;
`
const CouponText = styled.span`
  font-size:12px;
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
  const [userProfile, setUserProfile] = useState();

  useEffect(()=>{
    const getUserProfile = async () => {
      if(!jwtToken){
        return
      }
      const data = await api.getProfile(jwtToken);
      console.log(data);
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
        <BackEndButton to="/backend">Coupon管理後台</BackEndButton>
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
    if (!userProfile) {
      return
    }
    if (isLogin) return (
      <CouponWrapper>
        <FormFieldSet>
          <FormLegend>我的折價券</FormLegend>
          <CouponGroup>
          {userProfile.data.activity.length !== 0? userProfile.data.activity.map((coupon) => (
            <Coupon key={coupon.id}>
              <CouponTitle category={'activity'}>折價券</CouponTitle>
                <CouponContext>
                  <CouponText>
                    {coupon.name}
                  </CouponText>
                  <CouponText>
                    {coupon.description}
                  </CouponText>
                  <CouponText>
                    {coupon.expire_date}
                  </CouponText>
                </CouponContext>
              <CouponDiscount>$ {coupon.discount}</CouponDiscount>
            </Coupon>
          )) : <p>可憐,沒有任何券</p>}
          </CouponGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>我的免運券</FormLegend>
          <DeliveryGroup>
          {userProfile.data.delivery.length !== 0? userProfile.data.delivery.map((coupon) => (
            <Coupon key={coupon.id}>
              <CouponTitle category={'delivery'}>免運券</CouponTitle>
                <CouponContext>
                  <CouponText>
                    {coupon.name}
                  </CouponText>
                  <CouponText>
                    {coupon.description}
                  </CouponText>
                  <CouponText>
                    {coupon.expire_date}
                  </CouponText>
                </CouponContext>
              <CouponDiscount>$ {coupon.discount}</CouponDiscount>
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
