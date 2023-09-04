import React, { useEffect, useState } from 'react';
import { Periodo, Periodos, Navbar } from './styles';
import { CustomCard } from '../../components/Card';
import api from '../../services/api';
import { periodos } from '../../enums/comp';

const whoPeriod = (d) => {
  for (const i in periodos) {
    for (const j in periodos[i].items) {
      if (periodos[i].items[j] == d) return periodos[i].name
    }
  }
  return "Outros"
}

const toArray = (table) => {
  const rows = table.querySelectorAll('tbody tr');
  let data = structuredClone(periodos).map((periodo)=>{
    periodo.items = []
    return periodo;
  });
  rows.forEach(row => {
    const columns = row.querySelectorAll('td');
    const diario = columns[0].textContent.trim();
    const disciplina = columns[1].textContent.trim().replace(/Obrigatório\.\d+\s+-\s+/, "");
    const periodo = whoPeriod(disciplina)
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
    const i = data.findIndex(obj => obj.name === periodo);
    data[i].items.push({ diario, disciplina, chAula, tAulas, tFaltas, freq, situacao, n1, n2, md, naf, conceito });
  });
  console.log(data)
  return data
}

const Main = () => {
  const [username, setUsername] = useState("20211340014")
  const [password, setPassword] = useState("desireNull1vz2")
  const [token, setToken] = useState(null)
  const [boletim, setBoletim] = useState([])

  const login = async () => {
    try {
      const data = {
        "username": username,
        "password": password
      };
      const response = await api.post("/loginSuap", data);
      setToken(response.data["__Host-sessionid"]);
    } catch (error) {
      console.log("erro");
    }
  };
  const getBoletim = async () => {
      const documento = document.createElement('html');
      const response = await api.get(`/getBoletim?token=${token}&id=${username}`);
      documento.innerHTML = response.data
      setBoletim(toArray(documento.querySelector("table")).filter((periodo)=>{return periodo.items.length > 0}))
  };
  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    if (token) {
      getBoletim()
    }
  }, [token, username]);

  return (
    <>
      <Navbar>
        <h2>IF Api  </h2>
      </Navbar>
      <Periodos>
        {boletim.map((periodo, index) => (
          <>
          <h5>{periodo.name}
          <Periodo>
            {periodo.items.map((item, itemIndex) => (
              <CustomCard key={itemIndex}
                title={item.disciplina}
                data={"pagode"}
              />
            ))}
          </Periodo> 
          </h5>
          </>
        ))}
      </Periodos>
     
    </>

  );
};

export default Main;
