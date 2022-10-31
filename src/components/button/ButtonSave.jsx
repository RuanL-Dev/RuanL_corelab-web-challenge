import styled from 'styled-components'
import IconImages from '../iconImage/IconImages'

const StyledButtonSave = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  color: rgba(2, 2, 2, 0.7);
  padding: 5px 20px;
  border-radius: 100px;
  border: 0;
  font-size: 20px;
  line-height: 30px;
  transition: 0.3s;
  position: relative;

  :after {
    content: '';
    border-radius: 100px;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    border-top: 1px solid violet;
    border-bottom: 1px solid violet;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }
  :before {
    content: '';
    border-radius: 100px;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    border-left: 1px solid violet;
    border-right: 1px solid violet;
    transform: scaleY(0);
    transition: transform 0.2s ease-in-out;
  }
  :hover:before {
    transform: scaleY(1);
  }

  :hover:after {
    transform: scaleX(1);
  }

  ${(props) => !props.disabled && 'cursor: pointer;'}
  :hover {
    background-color: ${(props) => props.theme.buttonHover};
  }

  :disabled {
    background-color: ${(props) => props.theme.disabled};
  }
`

const ButtonSave = ({ children, loading, disabled, ...props }) => {
  return (
    <StyledButtonSave disabled={disabled || loading} {...props}>
      {loading && <IconImages imageName="loading" type="svg" size="25px" />}
      {!loading && children}
    </StyledButtonSave>
  )
}

export default ButtonSave
