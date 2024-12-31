import Web3 from "web3";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Configuração do Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "studentCPF",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "courseName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "institutionCNPJ",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "certificateHash",
        type: "bytes32",
      },
    ],
    name: "CertificateIssued",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_studentName", type: "string" },
      { internalType: "string", name: "_studentCPF", type: "string" },
      { internalType: "string", name: "_courseName", type: "string" },
      { internalType: "uint16", name: "_courseDuration", type: "uint16" },
      { internalType: "string", name: "_teachingModality", type: "string" },
      { internalType: "string", name: "_startDate", type: "string" },
      { internalType: "string", name: "_graduationDate", type: "string" },
      { internalType: "string", name: "_institutionCNPJ", type: "string" },
    ],
    name: "issueCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "certificateHash", type: "bytes32" },
    ],
    name: "validateCertificate",
    outputs: [
      {
        components: [
          { internalType: "string", name: "studentName", type: "string" },
          { internalType: "string", name: "studentCPF", type: "string" },
          { internalType: "string", name: "courseName", type: "string" },
          { internalType: "uint16", name: "courseDuration", type: "uint16" },
          { internalType: "string", name: "teachingModality", type: "string" },
          { internalType: "string", name: "startDate", type: "string" },
          { internalType: "string", name: "graduationDate", type: "string" },
          { internalType: "string", name: "institutionCNPJ", type: "string" },
        ],
        internalType: "struct Educhain.Certificate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new web3.eth.Contract(
  contractABI,
  process.env.CONTRACT_ADDRESS
);

export async function registerCertificate(certificate) {
  const studentName = certificate.student.name;
  const studentCPF = certificate.student.cpf;
  const courseName = certificate.course.courseName;
  const courseDuration = parseInt(certificate.course.courseDuration, 10);
  const teachingModality = certificate.course.teachingModality;
  const startDate = certificate.student.startDate;
  const graduationDate = certificate.student.graduationDate;
  const institutionCNPJ = certificate.course.courseProvider;

  const privateKey = process.env.PRIVATE_KEY;
  const fromAddress = process.env.WALLET_ADDRESS;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account); // Adiciona a conta à carteira do Web3

  // Verificar o saldo da conta antes de prosseguir com a transação
  const balance = await web3.eth.getBalance(fromAddress);

  if (Number(balance) === 0) {
    console.log("Saldo insuficiente para enviar a transação.");
    return;
  }

  const gasEstimate = await contract.methods
    .issueCertificate(
      studentName,
      studentCPF,
      courseName,
      courseDuration,
      teachingModality,
      startDate,
      graduationDate,
      institutionCNPJ
    )
    .estimateGas({ from: fromAddress });

  console.log("Estimativa de gás:", gasEstimate);

  try {
    const receipt = await contract.methods
      .issueCertificate(
        studentName,
        studentCPF,
        courseName,
        courseDuration,
        teachingModality,
        startDate,
        graduationDate,
        institutionCNPJ
      )
      .send({ from: fromAddress, gas: gasEstimate });

    console.log("Transação concluída com sucesso:", receipt);

    contract.events.CertificateIssued(
      { fromBlock: "latest" },
      (error, event) => {
        if (error) {
          console.error("Erro ao capturar evento:", error);
        } else {
          console.log("Evento emitido:", event);
        }
      }
    );

    return receipt.transactionHash;
  } catch (error) {
    console.error("Erro ao enviar a transação:", error);
  }
}

export async function getTransactionParams(transactionHash) {
  try {
    // Obter o recibo da transação utilizando a hash da transação
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);

    // Verificar se o recibo foi encontrado
    if (!receipt) {
      console.log("Transação não encontrada.");
      return;
    }

    // Buscar os logs de evento para pegar os parâmetros da função chamada
    const logs = receipt.logs;

    // Procurar o evento CertificateIssued, que é onde os parâmetros foram emitidos
    const certificateIssuedEvent = logs.find(
      (log) =>
        log.topics[0] ===
        web3.utils.sha3("CertificateIssued(string,string,string,bytes32)")
    );

    // Verificar se o evento foi encontrado
    if (certificateIssuedEvent) {
      const decodedLog = web3.eth.abi.decodeLog(
        [
          { type: "string", name: "studentCPF" },
          { type: "string", name: "courseName" },
          { type: "string", name: "institutionCNPJ" },
          { type: "bytes32", name: "certificateHash" },
        ],
        certificateIssuedEvent.data,
        certificateIssuedEvent.topics.slice(1)
      );

      // Retornar os parâmetros extraídos
      console.log("Parâmetros da transação:");
      console.log("Student CPF:", decodedLog.studentCPF);
      console.log("Course Name:", decodedLog.courseName);
      console.log("Institution CNPJ:", decodedLog.institutionCNPJ);

      return decodedLog;
    } else {
      console.log("Evento 'CertificateIssued' não encontrado nos logs.");
    }
  } catch (error) {
    console.error("Erro ao obter parâmetros da transação:", error);
  }
}
