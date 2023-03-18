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

const user = {
  "data": {
    "provider": "native",
    "name": "admin",
    "email": "admin@gmail.com",
    "picture": null,
    "activity": [
      {
        "id": 1,
        "name": "限時折扣",
        "description": "光棍節最新優惠",
        "start_date": "2023-03-17",
        "expire_date": "2023-06-17",
        "day_left": 90,
        "discount": 200,
        "category": "activity",
        "minimum": 1000,
        "product_category": "all"
      },
      {
        "id": 2,
        "name": "年終促銷",
        "description": "光棍節最新優惠",
        "start_date": "2023-03-17",
        "expire_date": "2023-06-17",
        "day_left": 90,
        "discount": 500,
        "category": "activity",
        "minimum": 1000,
        "product_category": "all"
      },
      {
        "id": 3,
        "name": "跳樓拍賣卷",
        "description": "光棍節最新優惠",
        "start_date": "2023-03-17",
        "expire_date": "2023-06-17",
        "day_left": 90,
        "discount": 100,
        "category": "activity",
        "minimum": 1000,
        "product_category": "all"
      },
            {
        "id": 7,
        "name": "跳樓拍賣卷",
        "description": "光棍節最新優惠",
        "start_date": "2023-03-17",
        "expire_date": "2023-06-17",
        "day_left": 90,
        "discount": 100,
        "category": "activity",
        "minimum": 1000,
        "product_category": "all"
      },
    ],
    "delivery": [
      {
        "id": 4,
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
        "id": 5,
        "name": "免運券！",
        "description": "年終最新優惠",
        "start_date": "2023-04-17",
        "expire_date": "2023-04-27",
        "day_left": 10,
        "discount": 30,
        "minimum": 0,
        "product_category": "all",
        "total": 4000
      },
      {
        "id": 6,
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
    "level": "鑽石",
    "promo_link": "AJEKGE",
    "accumulate": 2450
  }
}

const CounponSet = styled.div`
  display:flex;
  gap:20px;
  @media screen and (max-width: 1279px) {
    flex-direction:column
  }
`
const CounponGroup = styled.div`
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
const DeliveryGroup = styled(CounponGroup)`
  width: 510px;

@media screen and (max-width: 1279px) {
  width: 100%;
}
`
const Counpon = styled.div`
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
const CounponTitle = styled.div`
  display:flex;
  flex-direction:column;
  background-color:${({ category }) => category === 'delivery' ? 'green' : 'red'};
  border-radius:5px;
  height:100%;
`
const CounponContext = styled.div`
  display:flex;
  flex-direction:column;
  height:100%;
`
const CounponDiscount = styled.div`
  display:flex;
  align-items:center;
  justify-items:center;
  padding-top:10px;
  writing-mode:vertical-lr;
  font-weight:700;
  font-size:25px;
  height:100%;
`
const CounponText = styled.span`
  font-size:12px;
`


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
  const [discount,setDiscount] = useState({
    name:'',
    price:0,
  });
  const [deliverFee,setDeliverFee] = useState({
    name:'運費',
    price:0,
  });

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
            shipping: 'delivery',
            payment: 'credit_card',
            subtotal,
            freight,
            total: subtotal + freight - discount.price - deliverFee.price,
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
      <CounponSet>
        <FormFieldSet>
          <FormLegend>我的折價券</FormLegend>
          <CounponGroup>
          {user.data.activity.map((counpon) => (
            <Counpon key={counpon.id} onClick={()=>{
              setDiscount({
                name:counpon.name,
                price:counpon.discount,
              })
            }}>
              <CounponTitle category={'activity'}>折價券</CounponTitle>
                <CounponContext>
                  <CounponText>
                    {counpon.name}
                  </CounponText>
                  <CounponText>
                    {counpon.description}
                  </CounponText>
                  <CounponText>
                    {counpon.expire_date}
                  </CounponText>
                </CounponContext>
              <CounponDiscount CounponDiscount>$ {counpon.discount}</CounponDiscount>
            </Counpon>
          ))}
          </CounponGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>我的免運券</FormLegend>
          <DeliveryGroup>
          {user.data.delivery.map((counpon) => (
            <Counpon key={counpon.id} onClick={()=>{
              setDeliverFee({
                name:counpon.name,
                price:counpon.discount,
              })
            }}>
              <CounponTitle category={'delivery'}>免運券</CounponTitle>
                <CounponContext>
                  <CounponText>
                    {counpon.name}
                  </CounponText>
                  <CounponText>
                    {counpon.description}
                  </CounponText>
                  <CounponText>
                    {counpon.expire_date}
                  </CounponText>
                </CounponContext>
              <CounponDiscount>$ {counpon.discount}</CounponDiscount>
            </Counpon>
          ))}
          </DeliveryGroup>
        </FormFieldSet>
      </CounponSet>
      <SubtotalPrice>
        <PriceName>總金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal}</PriceValue>
      </SubtotalPrice>
      <ShippingPrice>
        <GreenPriceName freightDiscount={deliverFee.price}>{deliverFee.name}</GreenPriceName>
        <GreenCurrency freightDiscount={deliverFee.price}>NT.</GreenCurrency>
        <GreenPriceValue freightDiscount={deliverFee.price}>{freight - deliverFee.price}</GreenPriceValue>
      </ShippingPrice>
      <Discount />
      <TotalPrice>
        <PriceName>應付金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal + freight - discount.price - deliverFee.price}</PriceValue>
      </TotalPrice>
      <Button loading={loading} onClick={checkout}>確認付款</Button>
    </Wrapper>
  );
}

export default Checkout;
