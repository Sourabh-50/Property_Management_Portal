// Report Generation Bundle
(function() {
    // PDF Report Service
    const reportService = {
        // Generate PDF report for property search results
        generatePropertyReport: async (results, language = 'en') => {
            try {
                // Create PDF document
                const doc = new jsPDF();
                
                // Set document properties
                doc.setProperties({
                    title: 'Property Search Report',
                    subject: 'Property Search Results',
                    author: 'Property Search Assistant',
                    creator: 'Property Search System'
                });

                // Add header
                doc.setFontSize(20);
                doc.text('Property Search Report', 105, 20, { align: 'center' });
                
                // Add date and time
                doc.setFontSize(10);
                const now = new Date();
                doc.text(`Generated on: ${now.toLocaleString()}`, 105, 30, { align: 'center' });
                
                // Add search results
                let yPosition = 50;
                
                // Group results by source
                const groupedResults = results.reduce((groups, property) => {
                    if (!groups[property.source]) {
                        groups[property.source] = [];
                    }
                    groups[property.source].push(property);
                    return groups;
                }, {});
                
                // Add each source's results
                for (const [source, properties] of Object.entries(groupedResults)) {
                    // Add source header
                    doc.setFontSize(14);
                    doc.setTextColor(44, 62, 80); // Primary color
                    doc.text(`${source} Results (${properties.length})`, 20, yPosition);
                    yPosition += 10;
                    
                    // Add properties
                    properties.forEach(property => {
                        // Check if we need a new page
                        if (yPosition > 270) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        
                        // Add property details
                        doc.setFontSize(12);
                        doc.setTextColor(52, 152, 219); // Secondary color
                        doc.text(property.ownerName, 20, yPosition);
                        yPosition += 7;
                        
                        doc.setFontSize(10);
                        doc.setTextColor(0, 0, 0);
                        
                        // Add property details in a table format
                        const details = [
                            ['Property ID:', property.id],
                            ['Address:', property.address],
                            ['Registration No:', property.registrationNumber],
                            ['Registration Date:', property.registrationDate],
                            ['Area:', property.area],
                            ['Property Type:', property.propertyType],
                            ['Encumbrance:', property.encumbrance]
                        ];
                        
                        details.forEach(([label, value]) => {
                            doc.text(label, 25, yPosition);
                            doc.text(value, 80, yPosition);
                            yPosition += 7;
                        });
                        
                        // Add ownership history if available
                        if (property.ownershipHistory && property.ownershipHistory.length > 0) {
                            yPosition += 5;
                            doc.setFontSize(11);
                            doc.setTextColor(52, 152, 219);
                            doc.text('Ownership History:', 20, yPosition);
                            yPosition += 7;
                            
                            property.ownershipHistory.forEach(history => {
                                doc.setFontSize(10);
                                doc.setTextColor(0, 0, 0);
                                doc.text(`${history.from} to ${history.to}: ${history.owner}`, 25, yPosition);
                                yPosition += 7;
                            });
                        }
                        
                        yPosition += 10; // Add space between properties
                    });
                }
                
                // Add footer
                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(8);
                    doc.setTextColor(128, 128, 128);
                    doc.text(
                        'Generated by Property Search Assistant',
                        105,
                        doc.internal.pageSize.height - 10,
                        { align: 'center' }
                    );
                }
                
                return doc;
            } catch (error) {
                console.error('Error generating PDF report:', error);
                throw error;
            }
        },
        
        // Download PDF report
        downloadReport: async (results, filename = 'property-report.pdf', language = 'en') => {
            try {
                const doc = await reportService.generatePropertyReport(results, language);
                doc.save(filename);
                return true;
            } catch (error) {
                console.error('Error downloading PDF report:', error);
                throw error;
            }
        },
        
        // Print PDF report
        printReport: async (results, language = 'en') => {
            try {
                const doc = await reportService.generatePropertyReport(results, language);
                doc.autoPrint();
                window.open(doc.output('bloburl'), '_blank');
                return true;
            } catch (error) {
                console.error('Error printing PDF report:', error);
                throw error;
            }
        },
        
        // Get report as data URL
        getReportDataUrl: async (results, language = 'en') => {
            try {
                const doc = await reportService.generatePropertyReport(results, language);
                return doc.output('dataurlstring');
            } catch (error) {
                console.error('Error getting report data URL:', error);
                throw error;
            }
        }
    };

    // Export the report service
    window.reportService = reportService;
})(); 