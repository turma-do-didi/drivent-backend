import nodemailer from 'nodemailer';

type MailInfo = {
  userEmail: string;
  userName: string;
  ticketType: string;
  price: number;
};

export default async function sendEmail(mailInfo: MailInfo) {
  const { userEmail, userName, ticketType, price } = mailInfo;

  const html = `
    <h1> Pagamento confirmado! </h1>
    <h3> Olá, ${userName}! </h3>
    <h4> Aqui está o resumo da sua compra:</h4>
    <h4> ${ticketType} </h4>
    <h4> R$${price} </h4>
    <p> Qualquer dúvida entre em contato com o nosso atendente <strong>Davi Barci</strong> que ele terá o maior prazer em lhe atender! </p>

  `;

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'turma_do_didi@hotmail.com',
      pass: 'Turmadodidi123',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'Turma do Didi <turma_do_didi@hotmail.com>',
      to: userEmail,
      subject: 'Pagamento efetuado com sucesso!',
      html: html,
    });

    console.log('menssage sent ' + info.messageId);
  } catch (err) {
    console.log(err);
  }
}
