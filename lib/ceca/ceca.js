var data = {
	MERCHANT_ID : "082108630",
	ACQUIRER_BIN : "0000554002",
	TERMINAL_ID : "00000003",
	CLAVE_ENCRIPTACION : "87401456",
	TIPO_MONEDA : "978",
	EXPONENTE : "2",
	URL_OK : "http://www.ceca.es",
	URL_ERROR : "http://www.ceca.es"
};

module.exports = function(payment) {

	return {
		MerchantID : '082108630',
		AcquirerBIN : '0000554002',
		TerminalID : '00000003',
		Num_operacion : payment.id,
		Importe : payment.amount,
		TipoMoneda : '978',
		Exponente : '2',
		Firma : '',
		Pago_soportado : '',
		Idioma : '',
		Descripcion : '',
		URL_OK : 'http://localhost:8080/#/debts',
		URL_NOK : 'http://localhost:8080/#/debts',
		Cifrado: 'SHA1',
		URL: 'http://tpv.ceca.es:8000/cgi-bin/tpv'
	};

};
