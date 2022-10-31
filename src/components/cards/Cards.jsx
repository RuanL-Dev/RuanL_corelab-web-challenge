import { useState } from 'react'
import { useSWRConfig } from 'swr'
import axios from 'axios'

import styled from 'styled-components'
import EditCardRouter from './EditCardRouter'

import { GoTrashcan } from 'react-icons/go'
import { FaRegEdit } from 'react-icons/fa'
import { BsBookmarkHeart } from 'react-icons/bs'

const CardContainer = styled.div`
  background-color: ${(props) => props.color};
  width: 210px;
  height: 170px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  color: white;
  transition: 0.4s;

  :hover {
    transform: scale3d(1.1, 1.1, 1);
  }
`

const StyledCarName = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
`

const StyledCarPrice = styled.p`
  font-size: 14px;
`

const StyledCarDescription = styled.p`
  font-size: 14px;
`

const StyledCarYear = styled.p`
  font-size: 14px;
`

const StyledCardIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-left: 140px;
  cursor: pointer;
  color: #0d0c0c;
  max-width: 60px;
  font-size: 20px;
  border: none;
`

const transformColor = (color) => {
  const colors = {
    branco: '#e9e3e3',
    branca: '#e9e3e3',
    vermelho: 'rgb(199, 0, 0)',
    vermelha: 'rgb(199, 0, 0)',
    rosa: 'rgb(255, 100, 255)',
    verde: 'rgb(000 139 000)',
    prata: 'silver',
    azul: 'rgb(000 000 205)',
    preto: 'rgb(0, 0, 0, 0.80)',
    preta: 'rgb(0, 0, 0, 0.80)',
    amarelo: 'rgb(215, 220, 128)',
    laranja: 'orange',
    cinza: 'grey',
    marrom: '	#5C4033',
    roxo: 'purple',
    roxa: 'purple'
  }
  return colors[color] || 'rgb(190, 190, 190, 0.35)'
}

export default function Card({
  name,
  price,
  description,
  year,
  brand,
  plate,
  carColor,
  id,
  isLiked
}) {
  const [editCard, setEditCard] = useState(false)
  const { mutate } = useSWRConfig()

  const handleEdit = async () => {
    setEditCard(!editCard)
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`)
  }
  const handleLike = async () => {
    try {
      const { status } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`,
        {
          _id: id,
          carName: name,
          carPrice: price,
          carDescription: description,
          carYear: year,
          carBrand: brand,
          carPlate: plate,
          carColor: carColor,
          isLiked: !isLiked
        }
      )
      if (status === 201) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`)
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`, {
        data: {
          id
        }
      })
      if (response.status === 200) mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/indexCars`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <CardContainer color={transformColor(carColor)}>
        <StyledCardIcons>
          <FaRegEdit onClick={handleEdit} />
          <GoTrashcan onClick={handleDelete} />
          <BsBookmarkHeart onClick={handleLike} />
        </StyledCardIcons>
        {!editCard && (
          <>
            <StyledCarName>{name}</StyledCarName>
            <StyledCarPrice>PREÇO R$: {price}</StyledCarPrice>
            <StyledCarDescription>DESCRIÇÃO: {description}</StyledCarDescription>
            <StyledCarYear>ANO: {year}</StyledCarYear>
          </>
        )}
        {editCard && (
          <EditCardRouter
            id={id}
            name={name}
            price={price}
            description={description}
            year={year}
            brand={brand}
            carColor={carColor}
            plate={plate}
            onSave={handleEdit}
          />
        )}
      </CardContainer>
    </>
  )
}
