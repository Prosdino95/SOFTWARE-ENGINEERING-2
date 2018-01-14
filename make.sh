pandoc -s --toc -o temp.pdf RASD.rst && \
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=DeliveryFolder/RASD1.pdf \
Resources/frontpage_RASD.pdf temp.pdf && \
rm temp.pdf
pandoc -s --toc -V geometry:margin=1.5in -V geometry:a4paper -o temp.pdf DD.rst && \
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=DeliveryFolder/DD1.pdf \
Resources/frontpage_DD.pdf temp.pdf && \
rm temp.pdf
pandoc -s --toc -V geometry:margin=1.5in -V geometry:a4paper -o temp.pdf AcceptanceTest.rst && \
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=DeliveryFolder/AcceptanceTest.pdf \
Resources/frontpage_ATD.pdf temp.pdf && \
rm temp.pdf
cd implementation &&\
pandoc -s --toc -V geometry:margin=1.5in -V geometry:a4paper -o temp.pdf ITD.rst && \
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=./ITD.pdf frontpage_ITD.pdf temp.pdf && \
rm temp.pdf
