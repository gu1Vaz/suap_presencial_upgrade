import { styled } from "styled-components";

export const Periodos = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 82%;
    padding:1%;
    
`

export const DadosPeriodo = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

`
export const Periodo = styled.div`
    display: flex;
    flex-direction: column;
`
export const Navbar = styled.div`
    width: 100%;
    height: 14vh;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`

export const Dados = styled.div`
    display: flex;
    flex-direction: column;
    h6:nth-child(1) {
        color: #00FF00; 
    }
    h6:nth-child(2) {
        
    }
`
export const DivLogin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 5%;
`
export const Welcome = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    color: white;
    padding: 2%;
    margin-right: 1%;
    min-width: 20%;
    width: 23%;
    span{
        font-size: 14px;
    }
    .bold{
        font-weight: bold;
    }
    .line {
        text-decoration: line-through;
    }
`
export const Form = styled.div`
    display: flex;      
    flex-direction: column;
    margin-top: 10px;
    min-width: 20%;
    width: 30%;
    input {
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 14px;
        margin: 5px 0;
    }
    button {
        margin: 5px 0 0;
        padding: 6px 16px;
        background: #666666;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 100px;
        font-size: 16px;
    }
`;