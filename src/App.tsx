import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface Candidato {
  id_aluno: number;
  id_projeto: number;
  id_evento: number;
  situacao_candidato: string;
  qrcode: string;
}

interface Votante {
  id_aluno: number | null;
  id_visitante: number | null;
  id_evento: number;
  situacao_votante: string;
}

// Estilos com tipagem correta
const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
  boxShadow: '0 0 20px rgba(0,0,0,0.1)'
};

const thStyle: CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tdStyle: CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const containerStyle: CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
};

export default function Home() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [votantes, setVotantes] = useState<Votante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // DADOS MOCKADOS TEMPORARIAMENTE - INÍCIO
    setCandidatos([
      { id_aluno: 1, id_projeto: 101, id_evento: 1001, situacao_candidato: "Aprovado aaa", qrcode: "123456" },
      { id_aluno: 2, id_projeto: 102, id_evento: 1002, situacao_candidato: "Pendente", qrcode: "789012" }
    ]);
    
    setVotantes([
      { id_aluno: 3, id_visitante: null, id_evento: 1001, situacao_votante: "Votou aaaaaaaaaa" },
      { id_aluno: null, id_visitante: 200, id_evento: 1002, situacao_votante: "Não votou" }
    ]);
    
    setLoading(false);
    // DADOS MOCKADOS TEMPORARIAMENTE - FIM

    // CASO QUEIRA VOLTAR A USAR A API, DESCOMENTE O CÓDIGO ABAIXO:
    /*
    const fetchDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [resCandidatos, resVotantes] = await Promise.all([
          fetch('http://localhost:3000/candidatos'),
          fetch('http://localhost:3000/votantes')
        ]);

        if (!resCandidatos.ok) throw new Error('Erro ao carregar candidatos');
        if (!resVotantes.ok) throw new Error('Erro ao carregar votantes');

        const candidatosData = await resCandidatos.json();
        const votantesData = await resVotantes.json();

        setCandidatos(candidatosData);
        setVotantes(votantesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
    */
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dados...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
        Erro: {error}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>Sistema de Votação</h1>
      
      <h2 style={{ color: '#444', marginBottom: '20px' }}>Lista de Candidatos</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID Aluno</th>
            <th style={thStyle}>ID Projeto</th>
            <th style={thStyle}>ID Evento</th>
            <th style={thStyle}>Situação</th>
            <th style={thStyle}>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato) => (
            <tr key={candidato.id_aluno}>
              <td style={tdStyle}>{candidato.id_aluno}</td>
              <td style={tdStyle}>{candidato.id_projeto}</td>
              <td style={tdStyle}>{candidato.id_evento}</td>
              <td style={{
                ...tdStyle,
                color: candidato.situacao_candidato === 'Aprovado' ? 'green' : 'orange',
                fontWeight: 'bold'
              }}>
                {candidato.situacao_candidato}
              </td>
              <td style={tdStyle}>{candidato.qrcode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ color: '#444', margin: '40px 0 20px 0' }}>Lista de Votantes</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tipo</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>ID Evento</th>
            <th style={thStyle}>Situação</th>
          </tr>
        </thead>
        <tbody>
          {votantes.map((votante, index) => (
            <tr key={index}>
              <td style={tdStyle}>{votante.id_aluno !== null ? 'Aluno' : 'Visitante'}</td>
              <td style={tdStyle}>{votante.id_aluno ?? votante.id_visitante ?? 'N/A'}</td>
              <td style={tdStyle}>{votante.id_evento}</td>
              <td style={{
                ...tdStyle,
                color: votante.situacao_votante === 'Votou' ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
                {votante.situacao_votante}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}