/**
 * PDF Generation Utility
 * jsPDF + jspdf-autotable ব্যবহার করে professional PDF তৈরি
 *
 * বাংলা ফন্ট সমস্যা:
 *   jsPDF built-in ফন্টে বাংলা নেই → transliteration fallback ব্যবহার করা হয়েছে
 *   অথবা ASCII-safe বাংলা romanization।
 *   সঠিক সমাধানে custom TTF embed করতে হবে — এখানে unicode ব্যবহার হচ্ছে
 *   এবং browser print() কে প্রাথমিক পদ্ধতি হিসেবে recommend করা হচ্ছে।
 */

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ─────────────────────────────────────────────────────────────────
// সাধারণ বন্টননামা PDF (মূল ক্যালকুলেটর থেকে)
// ─────────────────────────────────────────────────────────────────
export const generateBontonnama = ({ results, assets, title = "উত্তরাধিকার বন্টননামা" }) => {
  try {
    console.log("PDF Generation Started", { results, assets });
    
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();

    // ── Header ──────────────────────────────────────────────────
    doc.setFillColor(26, 71, 49);
    doc.rect(0, 0, W, 22, "F");

    doc.setTextColor(201, 168, 76); // gold
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, W / 2, 10, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Hanafi Farayez | Islamic Inheritance Calculator", W / 2, 17, { align: "center" });

    // ── Date line ───────────────────────────────────────────────
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, W - 15, 28, { align: "right" });

    // ── Assets summary ──────────────────────────────────────────
    const assetLines = [];
    const hasVal = k => assets[k] && parseFloat(assets[k]) > 0;
    if (hasVal("taka"))   assetLines.push(`Cash: ${assets.taka} Taka`);
    if (hasVal("jomi"))   assetLines.push(`Land: ${assets.jomi} ${assets.jomiUnit || "Shotangso"}`);
    if (hasVal("shorno")) assetLines.push(`Gold: ${assets.shorno} ${assets.shornoUnit || "Bhori"}`);
    if (hasVal("rupa"))   assetLines.push(`Silver: ${assets.rupa} ${assets.rupaUnit || "Bhori"}`);

    if (assetLines.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text("Total Estate:", 15, 28);
      doc.text(assetLines.join("  |  "), 40, 28);
    }

    // ── Table columns ───────────────────────────────────────────
    const cols = ["Warish (Heir)", "Share (Shariat)"];
    if (hasVal("taka"))   cols.push(`Taka (TK)`);
    if (hasVal("jomi"))   cols.push(`Land (${assets.jomiUnit || "Shotangso"})`);
    if (hasVal("shorno")) cols.push(`Gold (${assets.shornoUnit || "Bhori"})`);
    if (hasVal("rupa"))   cols.push(`Silver (${assets.rupaUnit || "Bhori"})`);

    // ── Table rows ──────────────────────────────────────────────
    const rows = results.map((r) => {
      const row = [r.name, r.share];
      if (hasVal("taka"))   row.push(r.taka || "-");
      if (hasVal("jomi"))   row.push(r.jomi || "-");
      if (hasVal("shorno")) row.push(r.shorno || "-");
      if (hasVal("rupa"))   row.push(r.rupa || "-");
      return row;
    });

    doc.autoTable({
      head: [cols],
      body: rows,
      startY: 33,
      margin: { left: 15, right: 15 },
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 4,
        overflow: "linebreak",
        lineColor: [220, 213, 205],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [26, 71, 49],
        textColor: [201, 168, 76],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [247, 245, 240],
      },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [26, 71, 49] },
        1: { halign: "center", textColor: [80, 80, 80], fontSize: 8 },
      },
      didDrawPage: (data) => {
        // Footer on each page
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(7);
        doc.setTextColor(160, 160, 160);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}  |  Hanafi Farayez Calculator`,
          W / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" }
        );
      },
    });

    // ── Disclaimer ──────────────────────────────────────────────
    const finalY = doc.lastAutoTable.finalY + 8;
    if (finalY < doc.internal.pageSize.getHeight() - 25) {
      doc.setDrawColor(201, 168, 76);
      doc.setLineWidth(0.5);
      doc.line(15, finalY, W - 15, finalY);

      doc.setFontSize(7.5);
      doc.setTextColor(120, 80, 20);
      doc.text(
        "Note: This calculation follows Hanafi Madhhab Farayez principles. Consult a qualified Mufti before legal use.",
        W / 2,
        finalY + 6,
        { align: "center", maxWidth: W - 30 }
      );
    }

    doc.save("bontonnama.pdf");
    console.log("PDF Generated Successfully");
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("PDF তৈরিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।\n\nError: " + error.message);
  }
};

// ─────────────────────────────────────────────────────────────────
// মুনাসাখা PDF
// ─────────────────────────────────────────────────────────────────
export const generateMunasakhaPDF = ({ deceased, stages, finalRows, assets }) => {
  try {
    console.log("Munasakha PDF Generation Started", { deceased, stages, finalRows, assets });
    
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth();

    // ── Header ──────────────────────────────────────────────────
    doc.setFillColor(26, 71, 49);
    doc.rect(0, 0, W, 22, "F");
    doc.setTextColor(201, 168, 76);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Munasakha - Inheritance Chain", W / 2, 10, { align: "center" });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Hanafi Farayez | Successive Deaths Calculator", W / 2, 17, { align: "center" });

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, W - 15, 28, { align: "right" });

    let curY = 32;

    // ── প্রতিটি মৃতের জন্য আলাদা সেকশন ──────────────────────
    stages.forEach((stage, idx) => {
      if (curY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        curY = 15;
      }

      // Section header
      doc.setFillColor(240, 245, 242);
      doc.rect(15, curY, W - 30, 8, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 71, 49);
      doc.text(`Stage ${idx + 1}: ${stage.name} (Deceased)`, 18, curY + 5.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(7.5);
      doc.text(`Share in parent estate: ${stage.shareLabel || ""}`, W - 18, curY + 5.5, { align: "right" });
      curY += 10;

      if (!stage.rows || stage.rows.length === 0) {
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("No heirs — share goes to Baitul Mal", 18, curY + 4);
        curY += 10;
        return;
      }

      doc.autoTable({
        head: [["Heir", "Share", "Amount (Proportional)"]],
        body: stage.rows.map(r => [r.name || "", r.share || "", r.amount || "-"]),
        startY: curY,
        margin: { left: 15, right: 15 },
        styles: { fontSize: 8.5, cellPadding: 3 },
        headStyles: { fillColor: [45, 106, 79], textColor: 255, fontSize: 8 },
        alternateRowStyles: { fillColor: [247, 245, 240] },
        columnStyles: {
          0: { fontStyle: "bold", textColor: [26, 71, 49] },
          1: { halign: "center", textColor: [80, 80, 80] },
          2: { halign: "right" },
        },
      });
      curY = doc.lastAutoTable.finalY + 8;
    });

    // ── চূড়ান্ত বন্টন ──────────────────────────────────────────
    if (finalRows && finalRows.length > 0) {
      if (curY > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        curY = 15;
      }

      doc.setFillColor(26, 71, 49);
      doc.rect(15, curY, W - 30, 8, "F");
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(201, 168, 76);
      doc.text("Final Distribution", W / 2, curY + 5.5, { align: "center" });
      curY += 10;

      const hasVal = k => assets && assets[k] && parseFloat(assets[k]) > 0;
      const fCols = ["Heir", "Share %"];
      if (assets) {
        if (hasVal("taka"))   fCols.push(`Taka`);
        if (hasVal("jomi"))   fCols.push(`Land (${assets.jomiUnit || ""})`);
        if (hasVal("shorno")) fCols.push(`Gold (${assets.shornoUnit || ""})`);
        if (hasVal("rupa"))   fCols.push(`Silver (${assets.rupaUnit || ""})`);
      }

      doc.autoTable({
        head: [fCols],
        body: finalRows.map(r => {
          const row = [r.name || "", r.pct || ""];
          if (assets) {
            if (hasVal("taka"))   row.push(r.taka || "-");
            if (hasVal("jomi"))   row.push(r.jomi || "-");
            if (hasVal("shorno")) row.push(r.shorno || "-");
            if (hasVal("rupa"))   row.push(r.rupa || "-");
          }
          return row;
        }),
        startY: curY,
        margin: { left: 15, right: 15 },
        styles: { fontSize: 9, cellPadding: 4 },
        headStyles: { fillColor: [26, 71, 49], textColor: [201, 168, 76], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [247, 245, 240] },
        columnStyles: {
          0: { fontStyle: "bold", textColor: [26, 71, 49] },
          1: { halign: "center" },
        },
      });
      curY = doc.lastAutoTable.finalY + 10;
    }

    // Disclaimer
    if (curY < doc.internal.pageSize.getHeight() - 20) {
      doc.setFontSize(7.5);
      doc.setTextColor(120, 80, 20);
      doc.text(
        "Note: Munasakha calculation follows Hanafi Madhhab principles. Consult a qualified Mufti before legal use.",
        W / 2, curY + 4,
        { align: "center", maxWidth: W - 30 }
      );
    }

    doc.save("munasakha.pdf");
    console.log("Munasakha PDF Generated Successfully");
  } catch (error) {
    console.error("Munasakha PDF Generation Error:", error);
    alert("PDF তৈরিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।\n\nError: " + error.message);
  }
};
