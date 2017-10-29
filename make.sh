pandoc -s --toc -V geometry:margin=1.5in -o temp.pdf RASD.rst && \
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=DeliveryFolder/RASD1.pdf frontpage.pdf temp.pdf && \
rm temp.pdf
