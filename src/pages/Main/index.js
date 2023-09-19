import React, { useEffect, useState } from 'react';
import { Periodos, Periodo, DadosPeriodo, Navbar, Dados , Form, DivLogin, Welcome} from './styles';
import { CustomCard } from '../../components/Card';
import Loading from "../../components/Loading"
import api from '../../services/api';
import { periodos } from '../../enums/comp';
import { toast } from 'react-toastify';

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
  const [matricula, setMatricula] = useState(localStorage.getItem("matricula"))
  const [pass_suap, setPassSuap] = useState(localStorage.getItem("pass_suap"))
  const [cpf, setCpf] =  useState(localStorage.getItem("cpf"))
  const [pass_presencial, setPassPresencial] = useState(localStorage.getItem("pass_presencial"))
  const [token, setToken] = useState(localStorage.getItem("token_suap"))

  const [today, setToday] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [boletim, setBoletim] = useState(null)

  const login = async () => { 
    setLoading(true);
    try {
      const data = {
        "username": matricula,
        "password": pass_suap
      };
      const response = await api.post("/loginSuap", data);
      console.log(response.data)
      localStorage.setItem("matricula", matricula)
      localStorage.setItem("pass_suap", pass_suap)
      localStorage.setItem("token_suap", response.data["__Host-sessionid"])
      const tomorrow = new Date(new Date().getTime() + 2 * 60 * 1000);
      localStorage.setItem("suap_expires", tomorrow)
      setToken(response.data["__Host-sessionid"]);
    } catch (error) {
      toast.error("Usuario ou senha incorretos;")
      localStorage.removeItem("matricula")
      localStorage.removeItem("pass_suap")
    }
  };
  const getBoletim = async () => {
      try {
        const documento = document.createElement('html');
        const response = await api.get(`/getBoletim?token=${token}&id=${matricula}`);
        documento.innerHTML = response.data
        setBoletim(toArray(documento.querySelector("table")).filter((periodo)=>{return periodo.items.length > 0})) 
      } catch (error) {
        toast.error('Usuario ou senha incorretos', {position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",});
        localStorage.removeItem("matricula")
        localStorage.removeItem("pass_suap")
        setLoading(false);
      }
  };
  useEffect(() => {
    if (token) {
      setLoading(true);
      let expires = new Date(localStorage.getItem("suap_expires"))
      if(today < expires){
        getBoletim()
      }else{
        localStorage.removeItem("token_suap")
        localStorage.removeItem("suap_expires")
      }
    }else{
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    if (matricula && pass_suap && !token) login();
    
  }, []);

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
        <DivLogin>
          <Welcome>
            <span className='bold mb-2'>Bem vindo(a)!</span>
            <span className='mb-2' >IF API</span>
            <span className='bold'>?login</span>
            <span >-suap usuario e senha</span>
            <span className='mb-2' >-presencial usuario e senha</span>
            <span className='mt-5'>...paga uma coquinha pro pae dps 🧐</span>
          </Welcome>
          <Form>
            <h6>Suap credenciais</h6>
            <input name="matricula" type="matricula" placeholder="Usuário: Servidores (Nº SIAPE) / Contratados (CPF) / Alunos (RA)" required
                onChange={e=>setMatricula(e.target.value)} value={matricula} />
            <input name="pass_suap" type="password" placeholder="Senha" required
                onChange={e=>setPassSuap(e.target.value)} value={pass_suap} />
            <h6>Presencial credenciais</h6>
            <input name="cpf" type="cpf" placeholder="Cpf" required
                onChange={e=>setCpf(e.target.value)} value={cpf} />
            <input name="pass_presencial" type="password" placeholder="Senha" required
                onChange={e=>setPassPresencial(e.target.value)} value={pass_presencial} />
            <button onClick={login}>Login</button>
          </Form>
        </DivLogin>
      }
    </>
  );
};

export default Main;
