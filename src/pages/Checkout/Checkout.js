import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import api from '../../utils/api';
import tappay from '../../utils/tappay';
import { AuthContext } from '../../context/authContext';
import { CartContext } from '../../context/cartContext';
import Button from '../../components/Button';
import Cart from './Cart';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 47px 0 263px;
  max-width: 1280px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    padding: 20px 24px 236px;
  }
`;

const GrayBlock = styled.div`
  padding: 22px 30px;
  margin-top: 26px;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  line-height: 19px;
  font-size: 16px;

  @media screen and (max-width: 1279px) {
    padding: 10px 10px 20px;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    line-height: 17px;
  }
`;

const Label = styled.label`
  color: #3f3a3a;
  margin-left: 30px;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
  }
`;

const Select = styled.select`
  width: 171px;
  height: 30px;
  margin-left: 20px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;

  & + ${Label} {
    margin-left: 82px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`;

const Note = styled.div`
  line-height: 26px;
  margin-top: 20px;
  font-size: 16px;
  color: #3f3a3a;
`;

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

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 684px;

  ${FormLegend} + & {
    margin-top: 25px;
  }

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;

    ${FormLegend} + & {
      margin-top: 20px;
    }
  }
`;

const FormLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const FormControl = styled.input`
  width: 574px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px ${({ invalid }) => invalid ? '#CB4042' : '#979797'};

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const FormText = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #8b572a;
  margin-top: 10px;
  width: 100%;
  text-align: right;
`;

const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 30px;
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;

    & + & {
      margin-left: 27px;
    }
  }
`;

const FormCheckInput = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
`;

const FormCheckLabel = styled.label`
  margin-left: 10px;
  line-height: 26px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin-left: auto;

  @media screen and (max-width: 1279px) {
    width: 200px;
  }
`;

const SubtotalPrice = styled(Price)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const ShippingPrice = styled(Price)`
  margin-top: 20px;
  

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    
  }
`;

const TotalPrice = styled(Price)`
  margin-top: 20px;
  padding-top:24px;
  border-top: 1px solid #3f3a3a;
  @media screen and (max-width: 1279px) {
    margin-top: 16px;
    padding-top:20px;
    border-top: 1px solid #3f3a3a;
  }
`;

const PriceName = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;
const RedPriceName = styled(PriceName)`
  color: red;
`;
const GreenPriceName = styled(PriceName)`
  color: ${({ freightDiscount }) => freightDiscount > 0 ? 'green' : '#3f3a3a'};
`;
const Currency = styled.div`
  margin-left: auto;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
`;
const RedCurrency = styled(Currency)`
  color: red;
`;
const GreenCurrency = styled(Currency)`
  color: ${({ freightDiscount }) => freightDiscount > 0 ? 'green' : '#3f3a3a'};
`;
const PriceValue = styled.div`
  line-height: 36px;
  margin-left: 10px;
  font-size: 30px;
  color: #3f3a3a;
`;
const GreenPriceValue = styled(PriceValue)`
  color: ${({ freightDiscount }) => freightDiscount > 0 ? 'green' : '#3f3a3a'};
`

const DiscountValue = styled(PriceValue)`
  font-size: 22px;
  color: red;
`;

const CouponSet = styled.div`
  display:flex;
  gap:20px;
  @media screen and (max-width: 1279px) {
    flex-direction:column
  }
`
const CouponGroup = styled.div`
  display:flex;
  flex-wrap:wrap;
  max-width: 750px;
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

const formInputs = [
  {
    label: '收件人姓名',
    key: 'name',
    text: '務必填寫完整收件人姓名，避免包裹無法順利簽收',
  },
  { label: 'Email', key: 'email' },
  { label: '手機', key: 'phone' },
  { label: '地址', key: 'address' },
];

const timeOptions = [
  {
    label: '08:00-12:00',
    value: 'morning',
  },
  {
    label: '14:00-18:00',
    value: 'afternoon',
  },
  {
    label: '不指定',
    value: 'anytime',
  },
];

function Checkout() {
  const [recipient, setRecipient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    time: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardNumberRef = useRef();
  const cardExpirationDateRef = useRef();
  const cardCCVRef = useRef();
  const formRef = useRef();

  const { jwtToken, isLogin, login } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [ discount, setDiscount ] = useState({
    name:'',
    price:0,
    id:null,
  });
  const [ deliverDiscount, setDeliverDiscount ] = useState({
    name:'運費',
    price:0,
    id:null,
  });

  const [userProfile, setUserProfile] = useState();
  // console.log(userProfile);

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

  useEffect(() => {
    const setupTappay = async () => {
      await tappay.setupSDK();
      tappay.setupCard(
        cardNumberRef.current,
        cardExpirationDateRef.current,
        cardCCVRef.current
      );
    }
    setupTappay();
  }, []);

  if (!userProfile) {
    return
  }

  const subtotal = cartItems.reduce(
    (prev, item) => prev + item.price * item.qty,
    0
  );

  const freight = 30;

  async function checkout() {
    try {
      setLoading(true);      

      const token = isLogin ? jwtToken : await login();

      if (!token) {
        window.alert('請登入會員');
        return;
      }

      if (cartItems.length === 0) {
        window.alert('尚未選購商品');
        return;
      }
  
      if (Object.values(recipient).some((value) => !value)) {
        window.alert('請填寫完整訂購資料');
        setInvalidFields(Object.keys(recipient).filter(key => !recipient[key]))
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
  
      if (!tappay.canGetPrime()) {
        window.alert('付款資料輸入有誤');
        return;
      }
  
      const result = await tappay.getPrime();
      if (result.status !== 0) {
        window.alert('付款資料輸入有誤');
        return;
      }
  
      const { data } = await api.checkout(
        {
          prime: result.card.prime,
          order: {
            user_id: userProfile.user_id,
            shipping: 'delivery',
            payment: 'credit_card',
            subtotal,
            freight,
            activity_id: discount.id,
            activity_discount: discount.price,
            delivery_id: deliverDiscount.id,
            delivery_discount: deliverDiscount.price,
            used_points: 0,
            total: subtotal + freight - discount.price - deliverDiscount.price,
            recipient,
            list: cartItems,
          },
        },
        token
      );
      window.alert('付款成功');
      setCartItems([]);
      navigate('/thankyou', { state: { orderNumber: data.number } });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const Discount = () => {
    if (discount.price === 0){
      return
    }

    return(
      <ShippingPrice>
        <RedPriceName>{discount.name}</RedPriceName>
        <RedCurrency>NT.</RedCurrency>
        <DiscountValue>-{discount.price}</DiscountValue>
      </ShippingPrice>
    );
  }

  return (
    <Wrapper>
      <Cart />
      <GrayBlock>
        <Label>配送國家</Label>
        <Select>
          <option>臺灣及離島</option>
        </Select>
        <Label>付款方式</Label>
        <Select>
          <option>信用卡付款</option>
        </Select>
      </GrayBlock>
      <Note>
        ※ 提醒您：
        <br />● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達
        <br />● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取
      </Note>
      <form ref={formRef}>
        <FormFieldSet>
          <FormLegend>訂購資料</FormLegend>
          {formInputs.map((input) => (
            <FormGroup key={input.key}>
              <FormLabel>{input.label}</FormLabel>
              <FormControl
                value={recipient[input.key]}
                onChange={(e) =>
                  setRecipient({ ...recipient, [input.key]: e.target.value })
                }
                invalid={invalidFields.includes(input.key)}
              />
              {input.text && <FormText>{input.text}</FormText>}
            </FormGroup>
          ))}
          <FormGroup>
            <FormLabel>配送時間</FormLabel>
            {timeOptions.map((option) => (
              <FormCheck key={option.value}>
                <FormCheckInput
                  type="radio"
                  checked={recipient.time === option.value}
                  onChange={(e) => {
                    if (e.target.checked)
                      setRecipient({ ...recipient, time: option.value });
                  }}
                />
                <FormCheckLabel>{option.label}</FormCheckLabel>
              </FormCheck>
            ))}
          </FormGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>付款資料</FormLegend>
          <FormGroup>
            <FormLabel>信用卡號碼</FormLabel>
            <FormControl as="div" ref={cardNumberRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>有效期限</FormLabel>
            <FormControl as="div" ref={cardExpirationDateRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>安全碼</FormLabel>
            <FormControl as="div" ref={cardCCVRef} />
          </FormGroup>
        </FormFieldSet>
      </form>
      <CouponSet>
        <FormFieldSet>
          <FormLegend>我的折價券</FormLegend>
          <CouponGroup>
          {userProfile.data.activity.map((coupon) => (
            <Coupon key={coupon.id} onClick={()=>{
              setDiscount({
                name:coupon.name,
                price:coupon.discount,
                id:coupon.id,
              })
            }}>
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
          ))}
          </CouponGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>我的免運券</FormLegend>
          <DeliveryGroup>
          {userProfile.data.delivery.map((coupon) => (
            <Coupon key={coupon.id} onClick={()=>{
              setDeliverDiscount({
                name:coupon.name,
                price:coupon.discount,
                id:coupon.id,
              })
            }}>
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
          ))}
          </DeliveryGroup>
        </FormFieldSet>
      </CouponSet>
      <SubtotalPrice>
        <PriceName>總金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal}</PriceValue>
      </SubtotalPrice>
      <ShippingPrice>
        <GreenPriceName freightDiscount={deliverDiscount.price}>{deliverDiscount.name}</GreenPriceName>
        <GreenCurrency freightDiscount={deliverDiscount.price}>NT.</GreenCurrency>
        <GreenPriceValue freightDiscount={deliverDiscount.price}>{freight - deliverDiscount.price}</GreenPriceValue>
      </ShippingPrice>
      <Discount />
      <TotalPrice>
        <PriceName>應付金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal + freight - discount.price - deliverDiscount.price}</PriceValue>
      </TotalPrice>
      <Button loading={loading} onClick={checkout}>確認付款</Button>
    </Wrapper>
  );
}

export default Checkout;
