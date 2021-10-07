package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.Repositories.BookRepository;
import com.rmit.sept.bookmicroservices.model.Book;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;
import java.util.logging.*;

import static java.util.logging.Logger.getLogger;

@Service
public class BookCSVService {

    private static final Logger log = getLogger(BookCSVService.class.getName());

    @Autowired
    private final BookRepository bookrepository;

    public BookCSVService(BookRepository bookrepository) {
        this.bookrepository = bookrepository;
    }

    public void writeBooksToCsv(Writer writer){
        List<Book> books = (List<Book>) bookrepository.findAll();
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)) {
            for (Book book : books) {
                csvPrinter.printRecord(book.getId(), book.getTitle(),
                        book.getAuthor(), book.getISBN(),
                        book.getCategory(), book.getDescription());
            }
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void downloadCsv(PrintWriter writer, List<Book> books) {
        writer.write("ID,Title,Author,ISBN,Category,Description\n");
        for (Book book : books) {
            writer.write(String.format("%d,%s,%s,%s,%s,\"%s\" \n",book.getId(),book.getTitle(),
                    book.getAuthor(),book.getISBN(),book.getCategory(),book.getDescription()));
        }
    }
}
