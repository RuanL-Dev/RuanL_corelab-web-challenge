import styled from 'styled-components'

const StyledLabel = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid rgba(239, 239, 239, 0.6);
  border-radius: 100px;
  background-color: ${(props) => props.theme.background};
  padding: 15px 20px;
  box-sizing: border-box;
  margin: 20px 0;

  ${(props) => props.error && `border: 1px solid ${props.theme.error};`}
  &:focus {
    outline: none;
  }
`

const ContainerInput = styled.div`
  position: relative;
`

const FilterInput = ({ label, ...props }) => {
  return (
    <>
      <ContainerInput>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput type="text" {...props}></StyledInput>
      </ContainerInput>
    </>
  )
}

export default FilterInput
