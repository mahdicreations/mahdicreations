import glob, re

# Pages with callback forms that need fixing
pages_with_callback = [
    'index.html',
    'contact/index.html',
    'services/index.html',
    'services/creation-web/index.html',
    'services/seo/index.html',
    'services/marketing/index.html',
]

# We need to add for/id to callback form labels/inputs
# Each page has one callback-form with 3 inputs: name, phone, callDate
# We'll add unique id to each input + for= to each label, using a suffix per page

page_suffix_map = {
    'index.html': 'home',
    'contact/index.html': 'contact',
    'services/index.html': 'svc',
    'services/creation-web/index.html': 'cw',
    'services/seo/index.html': 'seo',
    'services/marketing/index.html': 'mkt',
}

updated = 0
for page, suffix in page_suffix_map.items():
    with open(page, encoding='utf-8', errors='replace') as f:
        html = f.read()

    # Find callback form and add for/id
    # Pattern: labels then matching inputs identified by data-field
    # Label "Nom complet *" -> input data-field="name"
    # Label "Numéro de téléphone *" -> input data-field="phone"
    # Label "Date & Heure souhaitées *" -> input data-field="callDate"

    mapping = [
        ('Nom complet', 'name', f'cb-name-{suffix}'),
        ('Num', 'phone', f'cb-phone-{suffix}'),
        ('Date', 'callDate', f'cb-date-{suffix}'),
    ]

    changed = False
    for label_text, field_name, uid in mapping:
        # Add for to matching label (only inside callback-form context)
        # Match: <label class="form-label ...">{text}</label>  (where text contains label_text)
        old_label = re.search(
            r'(<label\b[^>]*>)(' + re.escape(label_text) + r'[^<]*</label>)',
            html
        )
        if old_label:
            tag = old_label.group(1)
            if 'for=' not in tag:
                new_tag = tag.rstrip('>') + f' for="{uid}">'
                html = html.replace(old_label.group(0), new_tag + old_label.group(2), 1)
                changed = True

        # Add id to matching input (data-field="name/phone/callDate")
        old_input = re.search(
            r'(<input\b[^>]+data-field="' + re.escape(field_name) + r'"[^>]*?)(/?>)',
            html
        )
        if old_input:
            inp = old_input.group(1)
            end = old_input.group(2)
            if 'id=' not in inp:
                new_inp = inp + f' id="{uid}"'
                html = html.replace(old_input.group(0), new_inp + end, 1)
                changed = True

    if changed:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(html)
        updated += 1
        print(f'Updated: {page}')
    else:
        print(f'No changes needed: {page}')

print(f'\nDone. Updated {updated} files.')
