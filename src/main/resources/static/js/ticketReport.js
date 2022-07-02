"use strict";
class clientReport extends metodosReporte {
    constructor() {
		super("ticket/date","ticket-report-table");
	}

iniciarPagina() {
    this.cargarTabla();
}
}