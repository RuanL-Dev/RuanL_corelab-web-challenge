import { useRouter } from 'next/router'
import { SlMagnifier } from 'react-icons/sl'

import styled from 'styled-components'

import IconImages from '../iconImage/IconImages'

const IconImageContainer = styled.div`
  padding: 132px 0 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.input`
  width: 730px;
  height: 60px;
  left: 228px;
  top: 132px;
  background-color: ${(props) => props.theme.secondary};
  padding: 10px 50px;
  padding-left: 80px;
  border-radius: 100px;
  border: none;
  font-size: 30px;
  color: #000000;

  @media (max-width: 850px) {
    width: auto;
  }
  @media (max-width: 630px) {
    width: 400px;
  }
  @media (max-width: 510px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 250px;
  }
`
const StyledFilterImage = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.background};
`
const ContainerInput = styled.div`
  position: relative;
`
const StyledIconPosition = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
`

const SearchInput = ({ ...props }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/filtercar')
  }

  return (
    <>
      <IconImageContainer>
        <ContainerInput>
          <StyledInput type="text" placeholder="Buscar" {...props}></StyledInput>
          <StyledIconPosition>
            <SlMagnifier />
          </StyledIconPosition>
        </ContainerInput>
        <StyledFilterImage onClick={handleClick}>
          <IconImages imageName="FilterIcon" type="svg" />
        </StyledFilterImage>
      </IconImageContainer>
    </>
  )
}

export default SearchInput
