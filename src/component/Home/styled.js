import styled from 'styled-components'

export const LoaderDiv = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const MainHeading = styled.h1`
  color: #1e293b;
  padding-left: 30px;
`
export const CourseDiv = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`
export const FailureDiv = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FailureImage = styled.img`
  width: 500px;
`

export const FailureHead = styled.h1`
  color: #475569;
`
export const FailureButton = styled.button`
  background-color: #4656a1;
  border: 0px;
  border-radius: 6px;
  width: 100px;
  height: 30px;
  padding: 5px;
  color: white;
  cursor: pointer;
  font-weight: 500;
`

export const FailurePara = styled.p`
  color: #64778b;
`
