import { useController } from 'react-hook-form'
import styled from 'styled-components'

const InputContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const StyledLabel = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  width: 100%;
  border: 2px solid rgba(239, 239, 239, 0.6);
  border-radius: 100px;
  background-color: ${(props) => props.theme.background};
  padding: 15px 20px;
  box-sizing: border-box;

  ${(props) => props.error && `border: 2px solid ${props.theme.error};`}

  &:focus {
    outline: none;
  }
`

const ErrorLabel = styled.span`
  color: ${(props) => props.theme.error};
  font-weight: bold;
  font-size: 14px;
`

const errorMessage = {
  'string.empty': 'Obrigatório o preenchimento desse campo',
  'string.max': 'Este campo só permite o formato YYYY',
  'string.min': 'Este campo só permite o formato YYYY'
}

// eslint-disable-next-line react/display-name
const Input = ({ label, name, control, defaultValue = '', ...props }) => {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({ name, control, defaultValue })
  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput {...props} error={error} value={value} onChange={onChange} />
      {error && <ErrorLabel>{errorMessage[error.type] || error.message}</ErrorLabel>}
    </InputContainer>
  )
}

export default Input
