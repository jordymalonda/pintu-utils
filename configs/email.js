module.exports = {
  merchantRegistrationEmail: (params) => {
    let template = 'Hi {{owner}},\n\n';
    template += 'Terimakasih sudah bergabung!\n\n';
    template += 'Saat ini akun anda sedang kami proses. Silahkan pantau email anda selama 1x24jam.\n\n';
    template += 'Apabila Anda memiliki pertanyaan lebih lanjut, Anda dapat menghubungi kami di Hotline : 081 8880 369\n';
    template += 'WhatsApp: 08 558 200 369\n\n';
    template += 'Terima kasih\n';
    template += 'Hormat kami,\n';
    template += 'Tim Boost Indonesia\n';

    const keys = Object.keys(params);
    const values = Object.values(params);
    for (let i = 0; i < keys.length; i += 1) {
      const regex = new RegExp(`{{${keys[i]}}}`, 'g');
      template = template.replace(regex, values[i]);
    }

    return template;
  },

  canvasserRegistrationEmail: (params) => {
    let template = 'Hi {{canvasser}},\n\n';
    template += 'Terimakasih sudah mendaftarkan merchant {{merchant}}!\n\n';
    template += 'Saat ini akun merchant anda sedang kami proses.\n\n';
    template += 'Silakan hubungi admin anda untuk aktivasi\n';
    template += 'Apabila Anda memiliki pertanyaan lebih lanjut, Anda dapat menghubungi kami di Hotline : 081 8880 369\n';
    template += 'WhatsApp: 08 558 200 369\n\n';
    template += 'Terima kasih\n';
    template += 'Hormat kami,\n';
    template += 'Tim Boost Indonesia\n';

    const keys = Object.keys(params);
    const values = Object.values(params);
    for (let i = 0; i < keys.length; i += 1) {
      const regex = new RegExp(`{{${keys[i]}}}`, 'g');
      template = template.replace(regex, values[i]);
    }

    return template;
  },

  resetPasswordEmail: (params) => {
    let template = 'Hi {{canvasser}},\n\n';
    template += 'Kami telah menerima permintaan anda untuk reset password login aplikasi BoostPreneur anda.\n\n';
    template += 'Berikut merupakan password anda yang baru:\n';
    template += '{{password}}\n';
    template += 'Saat anda login berikutnya, mohon gunakan password baru di atas.\n\n';
    template += 'WhatsApp: 08 558 200 369\n\n';
    template += 'Terima kasih\n';
    template += 'Hormat kami,\n';
    template += 'Tim Boost Indonesia\n';

    const keys = Object.keys(params);
    const values = Object.values(params);
    for (let i = 0; i < keys.length; i += 1) {
      const regex = new RegExp(`{{${keys[i]}}}`, 'g');
      template = template.replace(regex, values[i]);
    }

    return template;
  }
};
