import React, { useEffect } from 'react';
import { Periodo, Periodos} from './styles';
import { CustomCard }  from '../../components/Card';
import api from '../../services/api';

const toArray = (table)=>{
    const rows = table.querySelectorAll('tbody tr');
    const data = [];
    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        const diario = columns[0].textContent.trim();
        const disciplina = columns[1].textContent.trim();
        const chAula = columns[2].textContent.trim();
        const tAulas = columns[3].textContent.trim();
        const tFaltas = columns[4].textContent.trim();
        const freq = columns[5].textContent.trim();
        const situacao = columns[6].querySelector('.status').textContent.trim();
        const n1 = columns[7].textContent.trim();
        const n2 = columns[8].textContent.trim();
        const md = columns[9].textContent.trim();
        const naf = columns[10].textContent.trim();
        const conceito = columns[11].textContent.trim();
    
        data.push({diario, disciplina, chAula, tAulas, tFaltas, freq, situacao, n1, n2,md, naf, conceito});
    });
}





const Main = () => {
  useEffect(()=>{
    fetch("https://presencial.muz.ifsuldeminas.edu.br/my/")
    .then(response => response.text())
    .then(html => {

        console.log(html)
    })
    .catch(error => {
        alert(1)
    });
  })
  const periodos = [
    { name: 'Quarto', items: ["Teoria dos Grafos","Linguagens de Programação II","Interação Humano-Computador (EAD)", "Engenharia de Software I", "Banco de Dados I", "Arquitetura e Organização de Computadores"] },
    { name: 'Sexto', items: ["Teoria da Computação","Redes de Computadores II","Pesquisa Operacional (EAD)", "Linguagens Formais e Autômatos", "Computação Gráfica", "Ciência dos Dados"] },
    { name: 'Oitavo', items: ["Sistemas de Informação (EAD)","Computadores e Sociedade (EAD)","Economia e Gestão (EAD)"] }
  ];

  return (
    <Periodos>
      {periodos.map((periodo, index) => (
        <Periodo>
            <h5>{periodo.name} </h5>
            {periodo.items.map((item, itemIndex) => (
                    <CustomCard key={itemIndex}
                                title={item}
                                ></CustomCard>
                ))}
        </Periodo>
      ))}
    </Periodos>
  );
};

export default Main;
