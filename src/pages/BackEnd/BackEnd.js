import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import styled from 'styled-components';
import api from '../../utils/api';

const Form = styled.form`
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 1279px) {
    padding: 60px 30px;
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
const CheckLabel = styled(FormLabel)`
  @media screen and (max-width: 1279px) {
    width: 30%;
  }
`

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
const Button = styled.button`
  position: relative;
  width: 240px;
  height: 60px;
  margin-top: 50px;
  border: solid 1px #979797;
  background-color: black;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
  display: block;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 44px;
    margin-top: 36px;
    border: solid 1px black;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
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

const formInputs = [
  { label: '活動名稱', key: 'name' },
  { label: '活動描述', key: 'description' },
  { label: '折價金額', key: 'discount' },
  { label: '開始日期', key: 'start_date' },
  { label: '結束日期', key: 'expire_date' },
  { label: '低消', key: 'minimum' },
  { label: '試用商品分類', key: 'product_category' },
  { label: '發行數量', key: 'total' },
];
const couponOptions = [
  {
    label: '折價券',
    value: 'activity',
  },
  {
    label: '免運券',
    value: 'delivery',
  },
];

const BackEnd = () => {
  const [recipient, setRecipient] = useState({
    name: '',
    description: '',
    discount: '',
    start_date: '',
    expire_date: '',
    minimum: '',
    product_category: '',
    total: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const { jwtToken } = useContext(AuthContext);
  const formRef = useRef();

  async function addCoupon() {
    try {     
      if (Object.values(recipient).some((value) => !value)) {
        window.alert('請填寫完整Coupon資料');
        setInvalidFields(Object.keys(recipient).filter(key => !recipient[key]))
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      const couponStatus = await api.addCoupon(recipient,jwtToken);
      window.alert(`新增成功 狀態:${couponStatus}`);
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <Wrapper>
      <Form ref={formRef}>
        <FormLegend>Coupon資料</FormLegend>
        <FormGroup>
          <CheckLabel>種類</CheckLabel>
          {couponOptions.map((option) => (
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
          </FormGroup>
        ))}
      </Form>
      <Button onClick={addCoupon}>確認送出</Button>
    </Wrapper>
  );
}

export default BackEnd;