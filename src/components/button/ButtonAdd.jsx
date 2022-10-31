import styled from 'styled-components'
import IconImages from '../iconImage/IconImages'

const StyledButtonAdd = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  color: rgba(2, 2, 2, 0.7);
  padding: 12px 90px;
  border-radius: 100px;
  border: 0;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  :hover {
    background-color: ${(props) => props.theme.buttonHover};
  }

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
  :disabled {
    background-color: ${(props) => props.theme.disabled};
  }
  @media (max-width: 400px) {
    width: 250px;
    padding: 12px 50px;
    font-size: 20px;
  }
`

const ButtonAdd = ({ children, loading, ...props }) => {
  return (
    <StyledButtonAdd disabled={loading} {...props}>
      {loading && <IconImages imageName="loading" type="svg" size="25px" />}
      {!loading && children}
    </StyledButtonAdd>
  )
}

export default ButtonAdd
