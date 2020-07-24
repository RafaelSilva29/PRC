<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="text"/>
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="obra">
    ###  http://www.semanticweb.org/rafaelsilva/ontologies/2020/arquivo-musica-digital#<xsl:value-of select="@id"/>
    :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
    :Obra ;
        :obraUtilizaInstrumento  <xsl:for-each-group select="instrumentos/instrumento" group-by=".">:<xsl:value-of select="partitura/@path"/>, </xsl:for-each-group>  ;
        :compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;
        :id "<xsl:value-of select="@id"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo"/>"^^xsd:string .
    <xsl:for-each-group select="instrumentos/instrumento" group-by=".">
          ###  http://www.semanticweb.org/rafaelsilva/ontologies/2020/arquivo-musica-digital#<xsl:value-of select="partitura/@path"/>
          :<xsl:value-of select="partitura/@path"/> rdf:type owl:NamedIndividual,
          :Instrumento ;
          :instrumentoUtilizadoObra :<xsl:value-of select="../../@id"/> ;
          :designacao "<xsl:value-of select="designacao"/>"^^xsd:string ;
          :partitura "<xsl:value-of select="partitura/@path"/>"^^xsd:string .
    </xsl:for-each-group>
    </xsl:template>
</xsl:stylesheet>