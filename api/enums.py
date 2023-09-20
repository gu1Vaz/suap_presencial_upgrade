urls_suap = { "login" : "https://suap.ifsuldeminas.edu.br/accounts/login/",
              "boletim" : "https://suap.ifsuldeminas.edu.br/edu/aluno/{matricula}/?tab=boletim"}
urls_presencial = { "login": "https://presencial.muz.ifsuldeminas.edu.br/login/index.php",
                    "atvs_today":"https://presencial.muz.ifsuldeminas.edu.br/calendar/view.php?view=day&time={time}"}
default_headers = {'Content-Type': 'application/x-www-form-urlencoded',
                       'Origin': 'https://suap.ifsuldeminas.edu.br',
                       'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'}
