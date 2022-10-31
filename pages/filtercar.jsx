import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import styled from 'styled-components'

import Body from '../src/components/layout/Body'
import ContainerPage from '../src/components/layout/ContainerPage'
import IconImages from '../src/components/iconImage/IconImages'
import Cards from '../src/components/cards/Cards'
import FilterInput from '../src/components/input/FilterInput'

const FormContainer = styled.div`
  background-color: ${(props) => props.theme.secondBackgroundColor};
  padding: 100px;
  position: relative;
  @media (max-width: 810px) {
    padding: 100px;
  }

  @media (max-width: 650px) {
    padding: 80px;
    padding-bottom: 100px;
  }

  @media (max-width: 650px) {
    padding: 50px;
    padding-bottom: 100px;
  }

  @media (max-width: 530px) {
    padding: 20px;
    padding-bottom: 100px;
  }

  @media (max-width: 470px) {
    padding: 10px;
    padding-bottom: 100px;
  }
`

const StyledArrow = styled.button`
  margin: 50px 750px 0px 0px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.background};
  @media (max-width: 830px) {
    margin: 50px 650px 0px 0px;
  }

  @media (max-width: 730px) {
    margin: 100px 350px 0px 0px;
  }

  @media (max-width: 430px) {
    margin: 100px 250px 0px 0px;
  }

  @media (max-width: 330px) {
    margin: 100px 150px 0px 0px;
  }
`

const MyFavorites = styled.div`
  margin-top: 30px;

  @media (max-width: 500px) {
    text-align: center;
  }
`
const StyledTitleFavorites = styled.div`
  font-size: 18px;
  @media (max-width: 500px) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`
const AnnouncesPostContainer = styled.div`
  margin: 20px 0 50px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 45px;
  grid-row-gap: 43px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
  }
  @media (max-width: 750px) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`
const MyAnnounces = styled.div`
  margin-top: 30px;

  @media (max-width: 500px) {
    text-align: center;
  }
`

const StyledTitleAnnounces = styled.div`
  font-size: 18px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;

  @media (max-width: 640px) {
    width: 400px;
  }

  @media (max-width: 445px) {
    width: 300px;
  }

  @media (max-width: 390px) {
    width: 280px;
  }

  @media (max-width: 330px) {
    width: 200px;
  }
`

const PriceForm = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`
const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function FilterCar() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`, fetcher)
  const router = useRouter()
  const [car, setCar] = useState('')

  const carIncludes = (data) => {
    return data.toUpperCase().includes(car.toUpperCase())
  }

  const filtering = (data) => {
    return data?.filter(
      (post) =>
        carIncludes(post.carModel) ||
        carIncludes(post.carBrand) ||
        carIncludes(post.carColor) ||
        carIncludes(post.carYear) ||
        carIncludes(post.carPlate) ||
        carIncludes(post.carPrice) ||
        carIncludes(post.carDescription)
    )
  }

  const handleClick = () => {
    router.push('/')
  }

  return (
    <>
      <Body>
        <ContainerPage>
          <StyledArrow onClick={handleClick}>
            <IconImages imageName="ArrowIcon" type="svg" />
          </StyledArrow>
          <FormContainer>
            <Form>
              <FilterInput
                label="Marca."
                placeholder="Digite a marca do carro"
                onChange={(event) => setCar(event.target.value)}
              />
              <FilterInput
                label="Cor"
                placeholder="Digite a cor do carro"
                onChange={(event) => setCar(event.target.value)}
              />
              <FilterInput
                label="Ano"
                placeholder="Digite o ano no formato (YYYY)"
                onChange={(event) => setCar(event.target.value)}
              />
              <PriceForm>
                <FilterInput
                  label="Preço mín."
                  placeholder="(R$)"
                  onChange={(event) => setCar(event.target.value)}
                />
                <FilterInput
                  label="Preço máx."
                  placeholder="(R$)"
                  onChange={(event) => setCar(event.target.value)}
                />
              </PriceForm>
            </Form>
          </FormContainer>
          <MyFavorites>
            <StyledTitleFavorites>Favoritos</StyledTitleFavorites>
          </MyFavorites>
          <AnnouncesPostContainer>
            {filtering(data)
              ?.filter((p) => p.isLiked)
              .map((post) => (
                <Cards
                  key={post._id}
                  name={post.carModel}
                  price={post.carPrice}
                  description={post.carDescription}
                  year={post.carYear}
                  brand={post.carBrand}
                  plate={post.carPlate}
                  id={post._id}
                  carColor={post.carColor.toLowerCase()}
                  isLiked={post.isLiked}
                />
              ))}
          </AnnouncesPostContainer>
          <MyAnnounces>
            <StyledTitleAnnounces>Meus anúncios</StyledTitleAnnounces>
          </MyAnnounces>
          <AnnouncesPostContainer>
            {filtering(data)
              ?.filter((p) => !p.isLiked)
              .map((post) => (
                <Cards
                  key={post._id}
                  name={post.carModel}
                  price={post.carPrice}
                  description={post.carDescription}
                  year={post.carYear}
                  brand={post.carBrand}
                  plate={post.carPlate}
                  id={post._id}
                  carColor={post.carColor.toLowerCase()}
                  isLiked={post.isLiked}
                />
              ))}
          </AnnouncesPostContainer>
        </ContainerPage>
      </Body>
    </>
  )
}
