# -*- coding: utf-8 -*-
"""
生成設施查詢 PDF 檔案
- 日本牛肉核准輸入設施
- 美國牛肉出口驗證設施
- 澳洲肉品工廠
"""

import json
import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# 專案根目錄
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
DATA_DIR = os.path.join(PUBLIC_DIR, 'data')

# 註冊中文字體（使用 Windows 內建字體）
FONT_PATH = "C:/Windows/Fonts/msjh.ttc"  # 微軟正黑體
if os.path.exists(FONT_PATH):
    pdfmetrics.registerFont(TTFont('MSJH', FONT_PATH))
    CHINESE_FONT = 'MSJH'
else:
    CHINESE_FONT = 'Helvetica'  # fallback

def create_styles():
    """建立樣式"""
    styles = getSampleStyleSheet()
    
    # 標題樣式
    styles.add(ParagraphStyle(
        name='ChineseTitle',
        fontName=CHINESE_FONT,
        fontSize=18,
        leading=24,
        alignment=1,  # center
        spaceAfter=20
    ))
    
    # 副標題樣式
    styles.add(ParagraphStyle(
        name='ChineseSubtitle',
        fontName=CHINESE_FONT,
        fontSize=10,
        leading=14,
        alignment=1,
        textColor=colors.grey,
        spaceAfter=30
    ))
    
    # 內文樣式
    styles.add(ParagraphStyle(
        name='ChineseBody',
        fontName=CHINESE_FONT,
        fontSize=9,
        leading=12
    ))
    
    return styles

def generate_jp_beef_pdf():
    """生成日本牛肉核准輸入設施 PDF"""
    json_path = os.path.join(DATA_DIR, 'jp-beef-facilities.json')
    pdf_path = os.path.join(PUBLIC_DIR, '日本牛肉核准輸入設施.pdf')
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    facilities = data['facilities']
    styles = create_styles()
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=20*mm,
        bottomMargin=20*mm
    )
    
    elements = []
    
    # 標題
    elements.append(Paragraph("日本牛肉核准輸入設施名單", styles['ChineseTitle']))
    elements.append(Paragraph(f"台灣輸入查驗用 · 最後更新：2026 年 3 月 10 日 · 共 {len(facilities)} 間工廠", styles['ChineseSubtitle']))
    elements.append(Spacer(1, 10))
    
    # 表格資料
    table_data = [['序號', '代碼', '工廠名稱', '地址']]
    for f in facilities:
        table_data.append([
            str(f['ref']),
            f['code'],
            Paragraph(f['name'][:50] + ('...' if len(f['name']) > 50 else ''), styles['ChineseBody']),
            Paragraph(f['address'][:40] + ('...' if len(f['address']) > 40 else ''), styles['ChineseBody'])
        ])
    
    # 建立表格
    col_widths = [30, 50, 200, 180]
    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), CHINESE_FONT),
        ('FONTNAME', (0, 1), (-1, -1), CHINESE_FONT),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#8B4513')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (1, -1), 'CENTER'),
        ('ALIGN', (2, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#FFF8F0')]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    
    elements.append(table)
    doc.build(elements)
    print(f"✅ 生成：{pdf_path}")
    return pdf_path

def generate_us_beef_pdf():
    """生成美國牛肉出口驗證設施 PDF"""
    json_path = os.path.join(DATA_DIR, 'us-bovine-ev-facilities.json')
    pdf_path = os.path.join(PUBLIC_DIR, '美國牛肉出口驗證設施.pdf')
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    facilities = data['facilities']
    styles = create_styles()
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=20*mm,
        bottomMargin=20*mm
    )
    
    elements = []
    
    # 標題
    elements.append(Paragraph("美國牛肉出口驗證設施名單", styles['ChineseTitle']))
    elements.append(Paragraph(f"USDA Bovine EV Program · 最後更新：2026 年 4 月 13 日 · 共 {len(facilities)} 間工廠", styles['ChineseSubtitle']))
    elements.append(Spacer(1, 10))
    
    # 表格資料
    table_data = [['序號', '工廠編號', '公司名稱']]
    for i, f in enumerate(facilities, 1):
        company_text = f['company'][:80] + ('...' if len(f['company']) > 80 else '')
        table_data.append([
            str(i),
            Paragraph(f['est_no'].replace('\n', ' '), styles['ChineseBody']),
            Paragraph(company_text, styles['ChineseBody'])
        ])
    
    # 建立表格
    col_widths = [30, 60, 380]
    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), CHINESE_FONT),
        ('FONTNAME', (0, 1), (-1, -1), CHINESE_FONT),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E3A5F')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (1, -1), 'CENTER'),
        ('ALIGN', (2, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0F5FF')]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    
    elements.append(table)
    doc.build(elements)
    print(f"✅ 生成：{pdf_path}")
    return pdf_path

def generate_au_factory_pdf():
    """生成澳洲肉品工廠 PDF"""
    pdf_path = os.path.join(PUBLIC_DIR, '澳洲肉品工廠查詢.pdf')
    
    # 澳洲肉品工廠資料
    au_factories = [
        {'code': '291', 'name': 'Australian Lamb Company', 'location': 'Victoria', 'type': '羊肉/牛肉'},
        {'code': '292', 'name': 'JBS Australia (Brooklyn)', 'location': 'Victoria', 'type': '牛肉'},
        {'code': '294', 'name': 'JBS Australia (Longford)', 'location': 'Tasmania', 'type': '牛肉/羊肉'},
        {'code': '296', 'name': 'Teys Australia (Naracoorte)', 'location': 'South Australia', 'type': '牛肉'},
        {'code': '298', 'name': 'Teys Australia (Wagga)', 'location': 'New South Wales', 'type': '牛肉'},
        {'code': '299', 'name': 'Ralphs Meat Company', 'location': 'Victoria', 'type': '羊肉/牛肉'},
        {'code': '301', 'name': 'Thomas Foods International', 'location': 'South Australia', 'type': '羊肉/牛肉'},
        {'code': '302', 'name': 'Teys Australia (Biloela)', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '303', 'name': 'JBS Australia (Dinmore)', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '304', 'name': 'JBS Australia (Toowoomba)', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '305', 'name': 'Teys Australia (Rockhampton)', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '306', 'name': 'Nippon Meat Packers (Aus)', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '307', 'name': 'Stanbroke Beef', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '308', 'name': 'Swift Australia (Yanco)', 'location': 'New South Wales', 'type': '牛肉/羊肉'},
        {'code': '309', 'name': 'Fletcher International Exports', 'location': 'New South Wales', 'type': '羊肉'},
        {'code': '310', 'name': 'Dinmore Meat Processors', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '311', 'name': 'Australian Country Choice', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '312', 'name': 'Meramist Pty Ltd', 'location': 'Queensland', 'type': '牛肉'},
        {'code': '313', 'name': 'John Dee Warwick', 'location': 'Queensland', 'type': '牛肉/羊肉'},
        {'code': '314', 'name': 'Nolan Meats', 'location': 'Queensland', 'type': '牛肉'},
    ]
    
    styles = create_styles()
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=20*mm,
        bottomMargin=20*mm
    )
    
    elements = []
    
    # 標題
    elements.append(Paragraph("澳洲肉品工廠名單", styles['ChineseTitle']))
    elements.append(Paragraph(f"經我國核准之澳洲肉品工廠（系統認證）· 最後更新：2026 年 2 月 6 日 · 共 {len(au_factories)} 間工廠", styles['ChineseSubtitle']))
    elements.append(Spacer(1, 10))
    
    # 表格資料
    table_data = [['廠號', '工廠名稱', '地區', '類型']]
    for f in au_factories:
        table_data.append([
            f['code'],
            Paragraph(f['name'], styles['ChineseBody']),
            f['location'],
            f['type']
        ])
    
    # 建立表格
    col_widths = [50, 200, 100, 80]
    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), CHINESE_FONT),
        ('FONTNAME', (0, 1), (-1, -1), CHINESE_FONT),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E7D32')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (1, 1), (1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0FFF0')]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    elements.append(table)
    doc.build(elements)
    print(f"✅ 生成：{pdf_path}")
    return pdf_path

if __name__ == '__main__':
    print("開始生成設施查詢 PDF...")
    generate_jp_beef_pdf()
    generate_us_beef_pdf()
    generate_au_factory_pdf()
    print("\n✅ 全部完成！")
