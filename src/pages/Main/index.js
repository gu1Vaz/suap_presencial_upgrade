import React, { useEffect, useState } from 'react';
import { Periodos, Periodo, DadosPeriodo, Navbar, Dados , Form} from './styles';
import { CustomCard } from '../../components/Card';
import Loading from "../../components/Loading"
import api from '../../services/api';
import { periodos } from '../../enums/comp';

const whoPeriod = (d) => {
  for (const i in periodos) {
    for (const j in periodos[i].items) {
      if (periodos[i].items[j] === d) return periodos[i].name
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
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [password, setPassword] = useState(localStorage.getItem("password"))
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [boletim, setBoletim] = useState(null)

  const login = async () => { 
    try {
      const data = {
        "username": username,
        "password": password
      };
      const response = await api.post("/loginSuap", data);
      localStorage.setItem("username", username)
      localStorage.setItem("password", password)
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
    if (username && password) login();
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      getBoletim()
    }
  }, [token]);

  return (
    <>
      <Navbar>
        <h2>IF Api  </h2>
        <h6 className='m-2'>by gui</h6>
      </Navbar>      
      {boletim ? 
        <Periodos>
          {boletim.map((periodo, index) => (
            <Periodo key={periodo.name}>
              <h5 className="mt-4">{periodo.name}</h5>
              <DadosPeriodo>
                {periodo.items.map((item, itemIndex) => (
                  <CustomCard key={itemIndex}
                    title={item.disciplina}
                    data={
                    <Dados>
                      <h6>{item.freq}</h6>
                      <h6>{item.tFaltas} faltas / {item.chAula} </h6>
                      <h6>Max: {parseInt(item.chAula) - (parseInt(item.chAula)*75)/100} faltas</h6>
                    </Dados>}
                  />
                ))}
              </DadosPeriodo> 
            </Periodo>
          ))}
        </Periodos>:
        loading? <Loading isPage={true} />:
        <Form >
          <input name="username" type="username" placeholder="Username" required
              onChange={e=>setUsername(e.target.value)} value={username} />
          <input name="password" type="password" placeholder="Senha" required
              onChange={e=>setPassword(e.target.value)} value={password} />

          <button onClick={login}>Login</button>
        </Form>
      }
    </>
  );
};

export default Main;
